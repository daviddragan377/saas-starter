"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

// Force dynamic rendering
export const dynamic = "force-dynamic"

const steps = [
  {
    title: "Welcome to SoulTide",
    subtitle: "Let's personalize your wellness journey",
    type: "welcome",
  },
  {
    title: "Tell us about yourself",
    subtitle: "What personality traits resonate with you?",
    type: "personality",
  },
  {
    title: "Areas for growth",
    subtitle: "What challenges would you like to work through?",
    type: "challenges",
  },
  {
    title: "Your aspirations",
    subtitle: "What goals are you hoping to achieve?",
    type: "goals",
  },
  {
    title: "You're all set!",
    subtitle: "Your personalized wellness journey begins now",
    type: "complete",
  },
]

const personalityTraits = [
  "Empathetic",
  "Analytical",
  "Creative",
  "Introverted",
  "Extroverted",
  "Perfectionist",
  "Spontaneous",
  "Organized",
  "Intuitive",
  "Logical",
]

const challenges = [
  "Anxiety",
  "Self-doubt",
  "Relationship issues",
  "Work stress",
  "Past trauma",
  "Sleep problems",
  "Emotional regulation",
  "Confidence",
  "Boundaries",
  "Grief",
]

const goals = [
  "Inner peace",
  "Better relationships",
  "Self-confidence",
  "Emotional healing",
  "Stress management",
  "Personal growth",
  "Spiritual connection",
  "Life purpose",
  "Mindfulness",
  "Self-love",
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [supabase, setSupabase] = useState<any>(null)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState("")
  const [formData, setFormData] = useState({
    personality: [] as string[],
    challenges: [] as string[],
    goals: [] as string[],
    additionalNotes: "",
  })

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Only import and use Supabase on the client side
        const { createClient } = await import("@/lib/supabase/client")
        const client = createClient()
        setSupabase(client)

        const {
          data: { user },
        } = await client.auth.getUser()

        if (!user) {
          router.push("/login")
        } else {
          setUser(user)
          console.log("User authenticated:", user.id)

          // Test database connection
          const { data: testData, error: testError } = await client.from("user_profiles").select("*").limit(1)

          console.log("Database test:", { testData, testError })
          setDebugInfo(`User ID: ${user.id}, DB Test: ${testError ? "Failed" : "Success"}`)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        setError("Failed to initialize authentication")
      }
    }

    initializeAuth()
  }, [router])

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save onboarding data
      if (!user || !supabase) {
        setError("Authentication not available")
        return
      }

      setIsLoading(true)
      setError("")

      try {
        console.log("=== STARTING ONBOARDING SAVE ===")
        console.log("User ID:", user.id)
        console.log("Form data:", formData)

        // Test if we can access the table at all
        console.log("Testing table access...")
        const { data: tableTest, error: tableTestError } = await supabase.from("user_profiles").select("count").limit(1)

        console.log("Table access test:", { tableTest, tableTestError })

        if (tableTestError) {
          setError(`Database access error: ${tableTestError.message}`)
          return
        }

        // Check if profile already exists
        console.log("Checking for existing profile...")
        const { data: existingProfile, error: checkError } = await supabase
          .from("user_profiles")
          .select("id, user_id")
          .eq("user_id", user.id)
          .maybeSingle()

        console.log("Existing profile check:", { existingProfile, checkError })

        // Prepare the data to save
        const profileData = {
          user_id: user.id,
          personality_traits: JSON.stringify(formData.personality),
          traumas_insecurities: JSON.stringify(formData.challenges),
          goals: JSON.stringify(formData.goals),
          updated_at: new Date().toISOString(),
        }

        console.log("Profile data to save:", profileData)

        let profileResult
        if (existingProfile) {
          console.log("Updating existing profile...")
          profileResult = await supabase
            .from("user_profiles")
            .update({
              personality_traits: JSON.stringify(formData.personality),
              traumas_insecurities: JSON.stringify(formData.challenges),
              goals: JSON.stringify(formData.goals),
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", user.id)
            .select()
        } else {
          console.log("Creating new profile...")
          profileResult = await supabase.from("user_profiles").insert(profileData).select()
        }

        console.log("Profile save result:", profileResult)

        if (profileResult.error) {
          console.error("Profile save error details:", {
            error: profileResult.error,
            message: profileResult.error.message,
            details: profileResult.error.details,
            hint: profileResult.error.hint,
            code: profileResult.error.code,
          })
          setError(`Failed to save profile: ${profileResult.error.message || "Unknown error"}`)
          return
        }

        console.log("Profile saved successfully!")

        // Create initial milestone (don't fail if this doesn't work)
        console.log("Creating milestone...")
        const milestoneResult = await supabase.from("journey_milestones").insert({
          user_id: user.id,
          title: "Started Wellness Journey",
          description: "Completed onboarding and set initial goals",
          milestone_type: "achievement",
          completed: true,
          completed_date: new Date().toISOString().split("T")[0],
        })

        console.log("Milestone save result:", milestoneResult)

        console.log("=== ONBOARDING SAVE COMPLETED ===")
        router.push("/dashboard/dreams")
      } catch (error: any) {
        console.error("Unexpected error during onboarding:", error)
        setError(`Unexpected error: ${error.message || "Unknown error"}`)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleSelection = (category: keyof typeof formData, item: string) => {
    if (category === "additionalNotes") return

    const currentList = formData[category] as string[]
    const newList = currentList.includes(item) ? currentList.filter((i) => i !== item) : [...currentList, item]

    setFormData({ ...formData, [category]: newList })
  }

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (step.type) {
      case "welcome":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Welcome to SoulTide</h2>
              <p className="text-stone-600">Your AI-powered companion for healing, growth, and self-discovery</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
              <p className="text-sm text-stone-700">
                We'll ask you a few questions to personalize your experience and provide the most relevant support for
                your unique journey.
              </p>
            </div>
            {debugInfo && <div className="bg-gray-100 p-2 rounded text-xs text-gray-600">Debug: {debugInfo}</div>}
          </div>
        )

      case "personality":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {personalityTraits.map((trait) => (
                <div key={trait} className="flex items-center space-x-2">
                  <Checkbox
                    id={trait}
                    checked={formData.personality.includes(trait)}
                    onCheckedChange={() => toggleSelection("personality", trait)}
                  />
                  <label htmlFor={trait} className="text-sm font-medium text-stone-700">
                    {trait}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )

      case "challenges":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {challenges.map((challenge) => (
                <div key={challenge} className="flex items-center space-x-2">
                  <Checkbox
                    id={challenge}
                    checked={formData.challenges.includes(challenge)}
                    onCheckedChange={() => toggleSelection("challenges", challenge)}
                  />
                  <label htmlFor={challenge} className="text-sm font-medium text-stone-700">
                    {challenge}
                  </label>
                </div>
              ))}
            </div>
            <Textarea
              placeholder="Anything else you'd like to share about your challenges?"
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="mt-4"
            />
          </div>
        )

      case "goals":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={formData.goals.includes(goal)}
                    onCheckedChange={() => toggleSelection("goals", goal)}
                  />
                  <label htmlFor={goal} className="text-sm font-medium text-stone-700">
                    {goal}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )

      case "complete":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">You're All Set!</h2>
              <p className="text-stone-600">Your personalized wellness journey is ready to begin</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
              <p className="text-sm text-stone-700">
                Based on your responses, we've customized your experience to support your unique path of healing and
                growth.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!user && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-stone-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => router.push("/login")}>Return to Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-stone-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-stone-500 mt-2">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <Card className="wellness-shadow border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-stone-800">{steps[currentStep].title}</CardTitle>
            <p className="text-stone-600">{steps[currentStep].subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStepContent()}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {currentStep > 0 && (
                <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent" disabled={isLoading}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : currentStep === steps.length - 1 ? "Start Journey" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
