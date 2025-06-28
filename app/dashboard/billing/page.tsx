"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Calendar, CheckCircle } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <PageHeader title="Billing & Subscription" subtitle="Manage your SoulTide subscription" />

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Plan</span>
              <Badge className="bg-purple-100 text-purple-700">Seeker</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Seeker Plan</p>
                <p className="text-sm text-stone-600">$19/month • Billed monthly</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$19.00</p>
                <p className="text-sm text-stone-600">Next billing: Jan 15, 2024</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-transparent">
                Change Plan
              </Button>
              <Button variant="outline" className="bg-transparent">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-stone-600">Expires 12/25</p>
                </div>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Update Payment Method
            </Button>
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { date: "Dec 15, 2023", amount: "$19.00", status: "Paid", invoice: "INV-001" },
              { date: "Nov 15, 2023", amount: "$19.00", status: "Paid", invoice: "INV-002" },
              { date: "Oct 15, 2023", amount: "$19.00", status: "Paid", invoice: "INV-003" },
            ].map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <div>
                  <p className="font-medium">{bill.date}</p>
                  <p className="text-sm text-stone-600">{bill.invoice}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-medium">{bill.amount}</p>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-sm text-green-600">{bill.status}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
