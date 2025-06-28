"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, RefreshCw, Heart, Star, Zap } from "lucide-react"

const mantras = [
  {
    text: "I am worthy of love and abundance in all forms",
    category: "Self-Love",
    icon: Heart,
    color: "from-pink-100 to-rose-100",
  },
  {
    text: "I trust my inner wisdom to guide me forward",
    category: "Intuition",
    icon: Star,
    color: "from-purple-100 to-indigo-100",
  },
  {
    text: "I release what no longer serves my highest good",
    category: "Letting Go",
    icon: Zap,
    color: "from-blue-100 to-cyan-100",
  },
  {
    text: "I am grateful for this moment and all its possibilities",
    category: "Gratitude",
    icon: Sparkles,
    color: "from-amber-100 to-yellow-100",
  },
]

export default function MantrasPage() {
  const [currentMantra, setCurrentMantra] = useState(mantras[0])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateNewMantra = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const randomMantra = mantras[Math.floor(Math.random() * mantras.length)]
      setCurrentMantra(randomMantra)
      setIsGenerating(false)
    }, 1000)
  }

  const IconComponent = currentMantra.icon

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-stone-50">
      <PageHeader title="Daily Mantras" subtitle="Affirmations for your soul" />

      <div className="p-4 space-y-6">
        <Card className={`wellness-shadow border-0 bg-gradient-to-br ${currentMantra.color}`}>
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-3">
              <IconComponent className="w-8 h-8 text-violet-600" />
            </div>
            <div className="inline-block bg-white/60 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-violet-700">{currentMantra.category}</span>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <blockquote className="text-xl font-medium text-stone-800 leading-relaxed px-4">
              "{currentMantra.text}"
            </blockquote>

            <Button
              onClick={generateNewMantra}
              disabled={isGenerating}
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 py-3"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate New
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg text-stone-800">Mantra Categories</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {[
              { name: "Self-Love", emoji: "💖", count: 12 },
              { name: "Abundance", emoji: "✨", count: 8 },
              { name: "Healing", emoji: "🌿", count: 15 },
              { name: "Confidence", emoji: "🦋", count: 10 },
              { name: "Peace", emoji: "🕊️", count: 9 },
              { name: "Growth", emoji: "🌱", count: 11 },
            ].map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="h-16 flex flex-col items-center justify-center gap-1 border-stone-200 hover:bg-violet-50 hover:border-violet-200 bg-transparent"
              >
                <span className="text-xl">{category.emoji}</span>
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs text-stone-500">{category.count} mantras</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg text-stone-800">Recent Mantras</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { text: "I am exactly where I need to be", date: "Today", category: "Presence" },
              { text: "My heart is open to receive love", date: "Yesterday", category: "Love" },
              { text: "I choose peace over perfection", date: "2 days ago", category: "Peace" },
            ].map((mantra, index) => (
              <div key={index} className="p-3 bg-stone-50 rounded-lg">
                <p className="font-medium text-stone-800 mb-2">"{mantra.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                    {mantra.category}
                  </span>
                  <span className="text-xs text-stone-500">{mantra.date}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
