import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BarChart, Users } from 'lucide-react'

export function TeamInsights() {
  const teamMembers = [
    { name: "Alex", avatar: "/avatar-1.jpg", score: 85 },
    { name: "Sam", avatar: "/avatar-2.jpg", score: 92 },
    { name: "Jordan", avatar: "/avatar-3.jpg", score: 78 },
    { name: "Casey", avatar: "/avatar-4.jpg", score: 88 },
  ]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Team Insights</CardTitle>
        <CardDescription>See how your team is progressing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-medium">{member.score}</span>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-6">
          <Users className="mr-2 h-4 w-4" />
          View Team Report
        </Button>
      </CardContent>
    </Card>
  )
}

