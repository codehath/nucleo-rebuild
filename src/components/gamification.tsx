import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Gift, ChevronRight } from 'lucide-react'

export function Gamification() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Keep improving to unlock rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 mr-2 text-yellow-500" />
              <div>
                <div className="font-bold">Level 7</div>
                <div className="text-sm text-muted-foreground">Empathy Master</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Badges
            </Button>
          </div>
          <div>
            <div className="flex justify-between mb-2 text-sm font-medium">
              <span>XP to Next Level</span>
              <span>2,450 / 3,000</span>
            </div>
            <Progress value={81.67} className="w-full" />
          </div>
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Rewards</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-purple-500" />
                  <span>Unlock Meditation Course</span>
                </div>
                <span className="text-sm text-muted-foreground">Level 8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-green-500" />
                  <span>$10 Charity Donation</span>
                </div>
                <span className="text-sm text-muted-foreground">Level 10</span>
              </div>
            </div>
          </div>
          <Button className="w-full">
            View All Rewards <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

