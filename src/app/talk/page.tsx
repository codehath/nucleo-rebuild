"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, X } from "lucide-react";
import { cn } from "@/utils/utils";
import { RealtimeClient } from "@openai/realtime-api-beta";
import { WavRecorder, WavStreamPlayer } from "@/lib/wavtools/index.js";
import { instructions } from "@/utils/conversation_config.js";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client.js";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Talk() {
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [items, setItems] = useState<ItemType[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  // Refs for audio handling
  const wavRecorderRef = useRef<WavRecorder>(
    new WavRecorder({ sampleRate: 24000 })
  );
  const wavStreamPlayerRef = useRef<WavStreamPlayer>(
    new WavStreamPlayer({ sampleRate: 24000 })
  );
  const clientRef = useRef<RealtimeClient>(
    new RealtimeClient({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowAPIKeyInBrowser: true,
    })
  );

  // Initialize client and audio handlers
  useEffect(() => {
    const client = clientRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    // Set up client configuration
    client.updateSession({ instructions });
    client.updateSession({ input_audio_transcription: { model: "whisper-1" } });

    // Handle conversation updates
    client.on("conversation.updated", async ({ item, delta }: any) => {
      const items = client.conversation.getItems();
      if (delta?.audio) {
        wavStreamPlayer.add16BitPCM(delta.audio, item.id);
      }
      if (item.status === "completed" && item.formatted.audio?.length) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000
        );
        item.formatted.file = wavFile;
      }
      setItems(items);
    });

    return () => {
      client.reset();
    };
  }, []);

  // Connect to conversation
  const connectToChat = async () => {
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    try {
      await wavRecorder.begin();
      await wavStreamPlayer.connect();
      await client.connect();

      setIsConnected(true);
      client.sendUserMessageContent([
        {
          type: "input_text",
          text: "Hello!",
        },
      ]);
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  // Handle start recording
  const startRecording = async () => {
    if (!isConnected) {
      await connectToChat();
    }

    setIsListening(true);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    const trackSampleOffset = await wavStreamPlayer.interrupt();
    if (trackSampleOffset?.trackId) {
      const { trackId, offset } = trackSampleOffset;
      await client.cancelResponse(trackId, offset);
    }
    await wavRecorder.record((data) => client.appendInputAudio(data.mono));
  };

  // Handle stop recording
  const stopRecording = async () => {
    setIsListening(false);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.pause();
    client.createResponse();
  };

  // Add function to handle message clicks
  const handleMessageClick = async (item: ItemType) => {
    const wavStreamPlayer = wavStreamPlayerRef.current;

    // If there's no audio file, do nothing
    if (!item.formatted.file) return;

    // If this message is currently playing, stop it
    if (currentlyPlaying === item.id) {
      await wavStreamPlayer.interrupt();
      setCurrentlyPlaying(null);
      return;
    }

    // If another message is playing, stop it first
    if (currentlyPlaying) {
      await wavStreamPlayer.interrupt();
    }

    // Play the new message
    if (item.formatted.file.url) {
      setCurrentlyPlaying(item.id);
      await wavStreamPlayer.add16BitPCM(item.formatted.audio, item.id);
      // Reset currently playing when done
      setCurrentlyPlaying(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 relative">
      {/* Visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={cn(
            "w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl transition-transform duration-1000",
            isListening ? "scale-150" : "scale-100"
          )}
        />
      </div>

      {/* Content */}
      <Card className="w-full max-w-sm bg-black/50 backdrop-blur-xl border-white/10 mb-4">
        <div className="p-6 text-center space-y-4">
          <h1 className="text-2xl font-bold">
            {isListening ? "Listening..." : "What's on your mind?"}
          </h1>
          <p className="text-muted-foreground">
            {isListening
              ? "Tap the button again to stop"
              : "Tap the button to start speaking"}
          </p>
        </div>
      </Card>

      {/* Chat Display */}
      <Card className="w-full max-w-sm bg-black/50 backdrop-blur-xl border-white/10 mb-20">
        <ScrollArea className="h-[300px] p-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMessageClick(item)}
              className={cn(
                "mb-4 p-3 rounded-lg cursor-pointer transition-colors",
                item.role === "user"
                  ? "bg-blue-500/20 ml-8 hover:bg-blue-500/30"
                  : "bg-purple-500/20 mr-8 hover:bg-purple-500/30",
                currentlyPlaying === item.id && "ring-2 ring-primary"
              )}
            >
              <p className="text-sm text-white">
                {item.formatted.transcript || item.formatted.text}
              </p>
              {item.formatted.file && (
                <div className="mt-1 text-xs text-muted-foreground">
                  {currentlyPlaying === item.id
                    ? "Playing..."
                    : "Click to play audio"}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </Card>

      {/* Controls */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center gap-4">
        <Button
          size="lg"
          className={cn(
            "h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
            isListening && "animate-pulse"
          )}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
        >
          <Mic className="h-6 w-6" />
        </Button>

        {isListening && (
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-white/10 bg-black/50"
            onClick={stopRecording}
          >
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
