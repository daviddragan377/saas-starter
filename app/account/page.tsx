"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Download, Trash2 } from "lucide-react"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <PageHeader title="Account Settings" subtitle="Manage your wellness journey preferences" />

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Sarah" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Johnson" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="sarah@example.com" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Profile</Button>
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Daily Reminders</Label>
                <p className="text-sm text-stone-600">Get gentle reminders for your wellness practices</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Insights</Label>
                <p className="text-sm text-stone-600">Receive weekly summaries of your progress</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>New Features</Label>
                <p className="text-sm text-stone-600">Be notified about new wellness tools</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Private Mode</Label>
                <p className="text-sm text-stone-600">Enhanced privacy for sensitive conversations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <Button variant="outline" className="w-full bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Two-Factor Authentication
            </Button>
          </CardContent>
        </Card>

        <Card className="wellness-shadow border-0">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export My Data
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Retake Onboarding Quiz
            </Button>
            <Separator />
            <Button variant="destructive" className="w-full flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
