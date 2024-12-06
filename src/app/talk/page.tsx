"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, X } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function Talk() {
  const [isListening, setIsListening] = useState(false)
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 relative">
      {/* Visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={cn(
          "w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl transition-transform duration-1000",
          isListening ? "scale-150" : "scale-100"
        )} />
      </div>
      
      {/* Content */}
      <Card className="w-full max-w-sm bg-black/50 backdrop-blur-xl border-white/10">
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
      
      {/* Controls */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center gap-4">
        <Button
          size="lg"
          className={cn(
            "h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
            isListening && "animate-pulse"
          )}
          onClick={() => setIsListening(!isListening)}
        >
          <Mic className="h-6 w-6" />
        </Button>
        
        {isListening && (
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-white/10 bg-black/50"
            onClick={() => setIsListening(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}

