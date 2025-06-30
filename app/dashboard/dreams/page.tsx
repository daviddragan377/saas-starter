"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sparkles, Eye, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface DreamEntry {
  id: string
  title: string
  description: string
  interpretation: string | null
  symbols: string[] | null
  created_at: string
}

export default function DreamsPage() {
  const [dreamText, setDreamText] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [dreams, setDreams] = useState<DreamEntry[]>([])
  const [user, setUser] = useState<any>(null)
  const [selectedDream, setSelectedDream] = useState<DreamEntry | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        await loadDreams(user.id)
      }
      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  const loadDreams = async (userId: string) => {
    const { data, error } = await supabase
      .from("dream_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (data && !error) {
      setDreams(data)
    }
  }

  const analyzeDream = async () => {
    if (!dreamText.trim() || !user) return

    setIsAnalyzing(true)

    // Simulate AI analysis - replace with actual AI call
    setTimeout(async () => {
      const aiInterpretation = `Your dream reveals themes of transformation and growth. The symbols you described suggest you're processing changes in your life. The water represents emotional cleansing, while the journey indicates personal evolution. This dream encourages you to trust your intuitive wisdom.`

      setInterpretation(aiInterpretation)

      // Save dream to database
      const { data, error } = await supabase
        .from("dream_entries")
        .insert({
          user_id: user.id,
          title: dreamText.slice(0, 50) + (dreamText.length > 50 ? "..." : ""),
          description: dreamText,
          interpretation: aiInterpretation,
          symbols: ["Transformation", "Growth", "Intuition"],
        })
        .select()
        .single()

      if (data && !error) {
        setDreams((prev) => [data, ...prev])

        // Save memory for AI personalization
        await supabase.from("user_memories").insert({
          user_id: user.id,
          memory_type: "insight",
          content: `Dream interpretation: ${aiInterpretation}`,
          context: { dream_symbols: ["Transformation", "Growth", "Intuition"] },
          importance_score: 7,
        })

        // Create milestone for first dream
        if (dreams.length === 0) {
          await supabase.from("journey_milestones").insert({
            user_id: user.id,
            title: "First Dream Analysis",
            description: "Explored subconscious patterns through dream interpretation",
            milestone_type: "achievement",
            completed: true,
            completed_date: new Date().toISOString().split("T")[0],
          })
        }
      }

      setIsAnalyzing(false)
    }, 2000)
  }

  const startNewDream = () => {
    setDreamText("")
    setInterpretation("")
    setSelectedDream(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-stone-50">
        <PageHeader title="Dream Journal" subtitle="Explore the wisdom of your subconscious" />
        <div className="p-4">
          <div className="text-center text-stone-600">Loading your dreams...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-stone-50">
      <PageHeader title="Dream Journal" subtitle="Explore the wisdom of your subconscious" />

      <div className="p-4 space-y-6">
        {!selectedDream ? (
          <>
            <Card className="wellness-shadow border-0">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Moon className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-lg text-stone-800">Describe Your Dream</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Share the details of your dream... What did you see, feel, or experience?"
                  value={dreamText}
                  onChange={(e) => setDreamText(e.target.value)}
                  className="min-h-32 border-stone-200 focus:border-indigo-300 focus:ring-indigo-200"
                />
                <Button
                  onClick={analyzeDream}
                  disabled={!dreamText.trim() || isAnalyzing || !user}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Interpreting...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Interpret Dream
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {interpretation && (
              <Card className="wellness-shadow border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-lg text-stone-800 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-indigo-600" />
                    Dream Interpretation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-700 leading-relaxed">{interpretation}</p>
                </CardContent>
              </Card>
            )}

            {dreams.length > 0 ? (
              <Card className="wellness-shadow border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-stone-800">Your Dream History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dreams.map((dream) => (
                    <button
                      key={dream.id}
                      onClick={() => setSelectedDream(dream)}
                      className="w-full p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors text-left"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-stone-800">{dream.title}</h4>
                        <span className="text-xs text-stone-500">
                          {new Date(dream.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {dream.symbols && (
                        <div className="flex gap-2">
                          {dream.symbols.map((symbol) => (
                            <span key={symbol} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                              {symbol}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="wellness-shadow border-0">
                <CardContent className="text-center py-8">
                  <Moon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-stone-600 mb-2">No Dreams Yet</h3>
                  <p className="text-stone-500">
                    Start by describing a dream above to begin your journey of self-discovery.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className="wellness-shadow border-0">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Button onClick={() => setSelectedDream(null)} variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <CardTitle className="text-lg text-stone-800">{selectedDream.title}</CardTitle>
                  <p className="text-sm text-stone-600">
                    {new Date(selectedDream.created_at).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-stone-800 mb-2">Your Dream</h4>
                <p className="text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-lg">{selectedDream.description}</p>
              </div>

              {selectedDream.interpretation && (
                <div>
                  <h4 className="font-medium text-stone-800 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
                    Interpretation
                  </h4>
                  <p className="text-stone-700 leading-relaxed bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
                    {selectedDream.interpretation}
                  </p>
                </div>
              )}

              {selectedDream.symbols && selectedDream.symbols.length > 0 && (
                <div>
                  <h4 className="font-medium text-stone-800 mb-2">Key Symbols</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDream.symbols.map((symbol) => (
                      <span key={symbol} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={startNewDream} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Analyze New Dream
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
