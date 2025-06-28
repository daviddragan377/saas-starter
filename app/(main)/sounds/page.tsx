"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, RotateCcw } from "lucide-react"

interface Sound {
  id: string
  name: string
  icon: string
  volume: number
  isPlaying: boolean
}

export default function SoundsPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [sounds, setSounds] = useState<Sound[]>([
    { id: "ocean", name: "Ocean Waves", icon: "🌊", volume: 50, isPlaying: false },
    { id: "rain", name: "Gentle Rain", icon: "🌧️", volume: 30, isPlaying: false },
    { id: "birds", name: "Forest Birds", icon: "🐦", volume: 20, isPlaying: false },
    { id: "chimes", name: "Wind Chimes", icon: "🎐", volume: 40, isPlaying: false },
    { id: "bowls", name: "Singing Bowls", icon: "🥣", volume: 60, isPlaying: false },
    { id: "fire", name: "Crackling Fire", icon: "🔥", volume: 25, isPlaying: false },
  ])

  const togglePlayAll = () => {
    setIsPlaying(!isPlaying)
    setSounds(sounds.map((sound) => ({ ...sound, isPlaying: !isPlaying && sound.volume > 0 })))
  }

  const updateSoundVolume = (soundId: string, volume: number) => {
    setSounds(
      sounds.map((sound) => (sound.id === soundId ? { ...sound, volume, isPlaying: volume > 0 && isPlaying } : sound)),
    )
  }

  const resetAll = () => {
    setIsPlaying(false)
    setSounds(sounds.map((sound) => ({ ...sound, volume: 0, isPlaying: false })))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-stone-50">
      <PageHeader title="Sound Healing" subtitle="Create your perfect soundscape" />

      <div className="p-4 space-y-6">
        <Card className="wellness-shadow border-0">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Volume2 className="w-8 h-8 text-emerald-600" />
            </div>
            <CardTitle className="text-lg text-stone-800">Sound Mixer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3 justify-center">
              <Button
                onClick={togglePlayAll}
                className={`rounded-full w-16 h-16 ${
                  isPlaying ? "bg-emerald-600 hover:bg-emerald-700" : "bg-stone-600 hover:bg-stone-700"
                } text-white`}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button
                onClick={resetAll}
                variant="outline"
                className="rounded-full w-16 h-16 border-stone-300 hover:bg-stone-50 bg-transparent"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>

            <div className="space-y-4">
              {sounds.map((sound) => (
                <div key={sound.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sound.icon}</span>
                      <span className="font-medium text-stone-800">{sound.name}</span>
                    </div>
                    <span className="text-sm text-stone-500">{sound.volume}%</span>
                  </div>
                  <Slider
                    value={[sound.volume]}
                    onValueChange={(value) => updateSoundVolume(sound.id, value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="text-lg text-stone-800">Preset Soundscapes</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {[
              { name: "Deep Sleep", emoji: "😴", sounds: ["ocean", "rain"] },
              { name: "Meditation", emoji: "🧘", sounds: ["bowls", "chimes"] },
              { name: "Focus", emoji: "🎯", sounds: ["rain", "fire"] },
              { name: "Nature Walk", emoji: "🌲", sounds: ["birds", "chimes"] },
            ].map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-2 border-stone-200 hover:bg-emerald-50 hover:border-emerald-200 bg-transparent"
              >
                <span className="text-2xl">{preset.emoji}</span>
                <span className="text-sm font-medium">{preset.name}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
