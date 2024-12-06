import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, BookOpen, Trophy, ChevronRight } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <div className="p-6 max-w-screen-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
      
      {/* Emotional Check-in */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">How are you feeling today?</h2>
            <p className="text-sm text-muted-foreground">Take a moment to reflect on your emotions</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button variant="outline" className="h-auto py-2 px-2 sm:px-4 space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <span>😊</span>
              <span>Great</span>
            </Button>
            <Button variant="outline" className="h-auto py-2 px-2 sm:px-4 space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <span>😐</span>
              <span>Okay</span>
            </Button>
            <Button variant="outline" className="h-auto py-2 px-2 sm:px-4 space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <span>😔</span>
              <span>Not Good</span>
            </Button>
            <Button variant="outline" className="h-auto py-2 px-2 sm:px-4 space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <span>😡</span>
              <span>Frustrated</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Your Learning Path</h2>
            <p className="text-sm text-muted-foreground">Keep growing your emotional intelligence</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <Progress value={65} className="h-2" />
            <Button className="w-full" variant="default">
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="hover:bg-accent transition-colors cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <span className="font-medium">EI Tools</span>
          </CardContent>
        </Card>
        <Card className="hover:bg-accent transition-colors cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
            <div className="p-2 rounded-full bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <span className="font-medium">Lessons</span>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Your Progress</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="font-bold">Level 7</div>
                <div className="text-sm text-muted-foreground">Empathy Master</div>
              </div>
            </div>
            <Link 
              href="/rewards"
              className="flex items-center text-sm text-primary hover:underline"
            >
              View Rewards
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm">Team Ranking</span>
            <span className="font-bold">#2 of 10</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

