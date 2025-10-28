"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, TrendingUp, Moon, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"
import { analytics } from "@/lib/analytics"

interface Task {
  id: number
  completed: boolean
  priority: "low" | "medium" | "high"
}

interface AnalyticsSummaryProps {
  tasks: Task[]
}

export function AnalyticsSummary({ tasks }: AnalyticsSummaryProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  const highPriorityTasks = tasks.filter((t) => t.priority === "high" && !t.completed).length

  const [themePreference, setThemePreference] = useState({ dark: 0, light: 0 })
  const [eventStats, setEventStats] = useState<Record<string, number>>({})

  useEffect(() => {
    const preference = analytics.getThemePreference()
    setThemePreference(preference)
    const stats = analytics.getEventStats()
    setEventStats(stats)
  }, [])

  const totalThemeSwitches = themePreference.dark + themePreference.light
  const darkModePercentage = totalThemeSwitches > 0 ? Math.round((themePreference.dark / totalThemeSwitches) * 100) : 0

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalTasks}</div>
            <p className="text-xs text-muted mt-1">All tasks in your list</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completedTasks}</div>
            <p className="text-xs text-muted mt-1">Tasks finished</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <Circle className="w-4 h-4 text-warning" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingTasks}</div>
            <p className="text-xs text-muted mt-1">Tasks remaining</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{completionRate}%</div>
            <p className="text-xs text-muted mt-1">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <Moon className="w-4 h-4 text-blue-400" />
              Dark Mode Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{darkModePercentage}%</div>
            <p className="text-xs text-muted mt-1">
              {themePreference.dark} dark / {themePreference.light} light
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Object.values(eventStats).reduce((a, b) => a + b, 0)}
            </div>
            <p className="text-xs text-muted mt-1">User interactions tracked</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{highPriorityTasks}</div>
            <p className="text-xs text-muted mt-1">Urgent tasks pending</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
