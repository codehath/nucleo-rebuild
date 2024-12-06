import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function TeamPage() {
  return (
    <div className="p-6 max-w-screen-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Team Insights</h1>
      
      {/* Team Progress */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Team Progress</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Team Members</h2>
          <div className="space-y-4">
            {[
              { name: "Alex", level: 7, progress: 65 },
              { name: "John", level: 6, progress: 55 },
              { name: "Sarah", level: 8, progress: 80 },
              { name: "Emma", level: 5, progress: 40 },
            ].map((member) => (
              <div key={member.name} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-sm text-muted-foreground">Level {member.level}</span>
                  </div>
                  <Progress value={member.progress} className="h-2 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Activity */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Team Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John completed a lesson</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Sarah shared a journal entry</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Emma reached Level 5</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

