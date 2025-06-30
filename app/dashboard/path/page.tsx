"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mountain, CheckCircle, Circle, Target, Calendar, MessageCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Milestone {
  id: string
  title: string
  description: string
  milestone_type: string
  completed: boolean
  target_date: string | null
  completed_date: string | null
  created_at: string
}

interface UserStats {
  daysActive: number
  dreamsAnalyzed: number
  chatSessions: number
  goalsAchieved: number
}

export default function PathPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [stats, setStats] = useState<UserStats>({
    daysActive: 0,
    dreamsAnalyzed: 0,
    chatSessions: 0,
    goalsAchieved: 0,
  })
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        await loadUserData(user.id)
      }
      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  const loadUserData = async (userId: string) => {
    try {
      // Load milestones
      const { data: milestonesData } = await supabase
        .from("journey_milestones")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (milestonesData) {
        setMilestones(milestonesData)
      }

      // Calculate stats
      const { data: profile } = await supabase.from("user_profiles").select("created_at").eq("user_id", userId).single()

      const { data: dreams } = await supabase.from("dream_entries").select("id").eq("user_id", userId)

      const { data: sessions } = await supabase.from("chat_sessions").select("id").eq("user_id", userId)

      const daysActive = profile
        ? Math.ceil((new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24))
        : 0

      const goalsAchieved = milestonesData?.filter((m) => m.completed && m.milestone_type === "goal").length || 0

      setStats({
        daysActive,
        dreamsAnalyzed: dreams?.length || 0,
        chatSessions: sessions?.length || 0,
        goalsAchieved,
      })
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  const statsConfig = [
    { label: "Days Active", value: stats.daysActive.toString(), icon: Calendar },
    { label: "Dreams Analyzed", value: stats.dreamsAnalyzed.toString(), icon: Mountain },
    { label: "Chat Sessions", value: stats.chatSessions.toString(), icon: MessageCircle },
    { label: "Goals Achieved", value: stats.goalsAchieved.toString(), icon: Target },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-stone-50">
        <PageHeader title="Your Journey" subtitle="Track your growth and milestones" />
        <div className="p-4">
          <div className="text-center text-stone-600">Loading your journey...</div>
        </div>
      </div>
    )
  }

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
              {statsConfig.map((stat) => {
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

        {milestones.length > 0 ? (
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
                          variant={milestone.milestone_type === "achievement" ? "default" : "secondary"}
                          className={`text-xs ${
                            milestone.milestone_type === "achievement"
                              ? "bg-teal-100 text-teal-700"
                              : milestone.milestone_type === "insight"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {milestone.milestone_type}
                        </Badge>
                      </div>
                      <p className="text-sm text-stone-600 mb-2">{milestone.description}</p>
                      <span className="text-xs text-stone-500">
                        {new Date(milestone.completed_date || milestone.created_at).toLocaleDateString("en-US", {
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
        ) : (
          <Card className="wellness-shadow border-0">
            <CardContent className="text-center py-8">
              <Mountain className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-stone-600 mb-2">Your Journey Begins</h3>
              <p className="text-stone-500">
                Start exploring dreams, chatting with your AI companion, or setting goals to see your milestones here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
