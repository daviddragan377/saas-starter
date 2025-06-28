"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mountain, CheckCircle, Circle, Target, Calendar, TrendingUp } from "lucide-react"

const milestones = [
  {
    id: 1,
    title: "Started Wellness Journey",
    description: "Completed onboarding and set initial goals",
    date: "2024-01-15",
    completed: true,
    type: "achievement",
  },
  {
    id: 2,
    title: "First Dream Analysis",
    description: "Explored subconscious patterns through dream interpretation",
    date: "2024-01-18",
    completed: true,
    type: "insight",
  },
  {
    id: 3,
    title: "Daily Meditation Practice",
    description: "Establish consistent 10-minute daily meditation",
    date: "2024-02-01",
    completed: false,
    type: "goal",
  },
  {
    id: 4,
    title: "Emotional Breakthrough",
    description: "Process childhood trauma with AI therapist",
    date: "2024-02-15",
    completed: false,
    type: "goal",
  },
]

const stats = [
  { label: "Days Active", value: "23", icon: Calendar },
  { label: "Dreams Analyzed", value: "8", icon: Mountain },
  { label: "Chat Sessions", value: "15", icon: TrendingUp },
  { label: "Goals Achieved", value: "3", icon: Target },
]

export default function PathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-stone-50">
      <PageHeader title="Your Journey" subtitle="Track your growth and milestones" />

      <div className="p-4 space-y-6">
        <Card className="wellness-shadow border-0">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mountain className="w-8 h-8 text-teal-600" />
            </div>
            <CardTitle className="text-lg text-stone-800">Journey Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const IconComponent = stat.icon
                return (
                  <div key={stat.label} className="text-center p-3 bg-stone-50 rounded-lg">
                    <IconComponent className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-stone-800">{stat.value}</div>
                    <div className="text-sm text-stone-600">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg text-stone-800">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {milestone.completed ? (
                      <CheckCircle className="w-6 h-6 text-teal-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-stone-400" />
                    )}
                    {index < milestones.length - 1 && <div className="w-px h-12 bg-stone-200 mt-2" />}
                  </div>

                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${milestone.completed ? "text-stone-800" : "text-stone-600"}`}>
                        {milestone.title}
                      </h4>
                      <Badge
                        variant={milestone.type === "achievement" ? "default" : "secondary"}
                        className={`text-xs ${
                          milestone.type === "achievement"
                            ? "bg-teal-100 text-teal-700"
                            : milestone.type === "insight"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {milestone.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-stone-600 mb-2">{milestone.description}</p>
                    <span className="text-xs text-stone-500">
                      {new Date(milestone.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0 bg-gradient-to-br from-teal-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-lg text-stone-800">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-medium text-stone-800 mb-1">Continue Daily Practice</h4>
              <p className="text-sm text-stone-600">You're 7 days into your meditation goal. Keep going!</p>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-medium text-stone-800 mb-1">Explore Dream Patterns</h4>
              <p className="text-sm text-stone-600">Your recent dreams show themes of transformation.</p>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <h4 className="font-medium text-stone-800 mb-1">Schedule Deep Session</h4>
              <p className="text-sm text-stone-600">Ready for a breakthrough conversation with your AI therapist?</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
