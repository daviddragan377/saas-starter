import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with your wellness journey",
    features: [
      "3 dream interpretations per month",
      "Basic chat sessions",
      "Limited sound library",
      "Weekly mantras",
      "Basic progress tracking",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Seeker",
    price: "$19",
    period: "per month",
    description: "For dedicated wellness practitioners",
    features: [
      "Unlimited dream interpretations",
      "Extended AI therapy sessions",
      "Full sound healing library",
      "Daily personalized mantras",
      "Advanced journey tracking",
      "Memory & insights system",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Sage",
    price: "$39",
    period: "per month",
    description: "For deep transformation and growth",
    features: [
      "Everything in Seeker",
      "Advanced AI personality modeling",
      "Custom sound creation tools",
      "Trauma-informed therapy modes",
      "Goal achievement coaching",
      "Weekly progress reports",
      "1-on-1 wellness consultation",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Choose Your Wellness Path</h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Start free and upgrade as you deepen your practice. All plans include our core AI wellness features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`wellness-shadow border-0 relative ${plan.popular ? "ring-2 ring-purple-500 scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-stone-800">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-stone-800">{plan.price}</span>
                  <span className="text-stone-600">/{plan.period}</span>
                </div>
                <p className="text-stone-600 mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-stone-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full ${plan.popular ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "bg-stone-800 hover:bg-stone-700 text-white"}`}
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
