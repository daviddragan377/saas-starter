"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sparkles, Eye } from "lucide-react"

export default function DreamsPage() {
  const [dreamText, setDreamText] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeDream = async () => {
    if (!dreamText.trim()) return

    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setInterpretation(
        `Your dream reveals themes of transformation and growth. The symbols you described suggest you're processing changes in your life. The water represents emotional cleansing, while the journey indicates personal evolution. This dream encourages you to trust your intuitive wisdom.`,
      )
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-stone-50">
      <PageHeader title="Dream Journal" subtitle="Explore the wisdom of your subconscious" />

      <div className="p-4 space-y-6">
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
              disabled={!dreamText.trim() || isAnalyzing}
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

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg text-stone-800">Recent Dreams</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Flying Over Mountains", date: "2 days ago", symbols: ["Freedom", "Perspective"] },
              { title: "Ocean Waves", date: "1 week ago", symbols: ["Emotions", "Cleansing"] },
            ].map((dream, index) => (
              <div key={index} className="p-3 bg-stone-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-stone-800">{dream.title}</h4>
                  <span className="text-xs text-stone-500">{dream.date}</span>
                </div>
                <div className="flex gap-2">
                  {dream.symbols.map((symbol) => (
                    <span key={symbol} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      {symbol}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
