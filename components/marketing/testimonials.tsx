import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Wellness Coach",
    content:
      "SoulTide has transformed how I understand my dreams and emotions. The AI therapy sessions feel genuinely supportive and insightful.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "Meditation Teacher",
    content:
      "The sound healing mixer is incredible. I use it daily for my practice and with my students. The personalized mantras are spot-on.",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Emma Thompson",
    role: "Therapist",
    content:
      "As a professional therapist, I'm impressed by the quality of the AI conversations. It's a wonderful complement to traditional therapy.",
    rating: 5,
    avatar: "ET",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Trusted by Wellness Seekers</h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Join thousands who have found healing and growth through SoulTide's AI-powered wellness platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="wellness-shadow border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-stone-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-700">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{testimonial.name}</p>
                    <p className="text-sm text-stone-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
