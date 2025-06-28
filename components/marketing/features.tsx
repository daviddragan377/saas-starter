import { Card, CardContent } from "@/components/ui/card"
import { Moon, MessageCircle, Volume2, Sparkles, Mountain, Brain } from "lucide-react"

const features = [
  {
    icon: Moon,
    title: "Dream Interpretation",
    description: "Unlock the wisdom of your subconscious with AI-powered dream analysis and symbolic interpretation.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: MessageCircle,
    title: "AI Therapy Sessions",
    description:
      "Engage in compassionate, therapeutic conversations with an AI trained in wellness and mental health support.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Volume2,
    title: "Sound Healing",
    description:
      "Create personalized soundscapes with our interactive mixer featuring nature sounds and healing frequencies.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Sparkles,
    title: "Personalized Mantras",
    description:
      "Receive daily affirmations and mantras tailored to your goals, challenges, and current emotional state.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Mountain,
    title: "Growth Journey",
    description:
      "Track your progress with milestone mapping, goal setting, and insights into your personal development.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Memory & Insights",
    description:
      "Our AI remembers your preferences and insights, creating increasingly personalized support over time.",
    color: "from-rose-500 to-pink-500",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Everything You Need for Wellness</h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Comprehensive AI-powered tools designed to support every aspect of your healing and growth journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="wellness-shadow border-0 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
