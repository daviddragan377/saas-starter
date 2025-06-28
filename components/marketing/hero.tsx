import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Moon, MessageCircle, Volume2, Sparkles, Mountain } from "lucide-react"

export function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6 leading-tight">
            Your AI-Powered
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Wellness Journey
            </span>
          </h1>
          <p className="text-xl text-stone-600 mb-8 leading-relaxed">
            Discover healing, growth, and inner peace with personalized AI guidance. From dream interpretation to
            therapeutic conversations, SoulTide supports your unique path to wellness.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 text-lg"
          >
            <Link href="/signup">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="px-8 py-4 text-lg bg-transparent">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-2xl mx-auto">
          {[
            { icon: Moon, label: "Dream Analysis", color: "from-indigo-100 to-purple-100" },
            { icon: MessageCircle, label: "AI Therapy", color: "from-amber-100 to-orange-100" },
            { icon: Volume2, label: "Sound Healing", color: "from-emerald-100 to-teal-100" },
            { icon: Sparkles, label: "Daily Mantras", color: "from-violet-100 to-purple-100" },
            { icon: Mountain, label: "Growth Path", color: "from-teal-100 to-cyan-100" },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-3 wellness-shadow`}
              >
                <feature.icon className="w-8 h-8 text-stone-700" />
              </div>
              <p className="text-sm font-medium text-stone-600">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
