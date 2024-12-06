import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle } from 'lucide-react'

export function LearningPath() {
  const lessons = [
    { id: 1, title: "Understanding Emotions", completed: true },
    { id: 2, title: "Active Listening", completed: true },
    { id: 3, title: "Empathy in Practice", completed: false },
    { id: 4, title: "Conflict Resolution", completed: false },
  ]

  const completedLessons = lessons.filter((lesson) => lesson.completed).length
  const progress = (completedLessons / lessons.length) * 100

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Your Learning Path</CardTitle>
        <CardDescription>Keep growing your emotional intelligence</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm font-medium">
              <span>Progress</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center">
                {lesson.completed ? (
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <div className="mr-2 h-4 w-4 rounded-full border-2 border-muted-foreground" />
                )}
                <span className={lesson.completed ? "line-through text-muted-foreground" : ""}>
                  {lesson.title}
                </span>
              </div>
            ))}
          </div>
          <Button className="w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            Continue Learning
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

