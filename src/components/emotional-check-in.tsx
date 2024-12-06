import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight } from 'lucide-react'

export function EmotionalCheckIn() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [showJournal, setShowJournal] = useState(false)

  const emotions = [
    { emoji: "😊", label: "Great" },
    { emoji: "😐", label: "Okay" },
    { emoji: "😔", label: "Not Good" },
    { emoji: "😡", label: "Frustrated" },
  ]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
        <CardDescription>Take a moment to reflect on your emotions</CardDescription>
      </CardHeader>
      <CardContent>
        {!showJournal ? (
          <div className="grid grid-cols-2 gap-4">
            {emotions.map((emotion) => (
              <Button
                key={emotion.label}
                variant={selectedEmotion === emotion.label ? "default" : "outline"}
                className="h-20 text-lg"
                onClick={() => setSelectedEmotion(emotion.label)}
              >
                <span className="mr-2 text-2xl">{emotion.emoji}</span>
                {emotion.label}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Textarea
              placeholder="Write about your feelings..."
              className="min-h-[150px]"
            />
            <Button className="w-full">Save Journal Entry</Button>
          </div>
        )}
        {selectedEmotion && !showJournal && (
          <Button
            className="w-full mt-4"
            onClick={() => setShowJournal(true)}
          >
            Journal about it <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

