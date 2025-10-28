"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"
import { analytics } from "@/lib/analytics"

interface TaskFiltersProps {
  filters: {
    status: string
    priority: string
    tag: string
    search: string
  }
  onFiltersChange: (filters: any) => void
}

export function TaskFilters({ filters, onFiltersChange }: TaskFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    if (value && value !== "all" && value !== "") {
      analytics.trackFilterApplied(key)
    }
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handleReset = () => {
    onFiltersChange({
      status: "all",
      priority: "all",
      tag: "",
      search: "",
    })
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="px-3 py-2 rounded-md bg-input border border-border text-foreground"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className="px-3 py-2 rounded-md bg-input border border-border text-foreground"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <Input
            placeholder="Filter by tag..."
            value={filters.tag}
            onChange={(e) => handleFilterChange("tag", e.target.value)}
            className="bg-input border-border"
          />

          <Button onClick={handleReset} variant="outline" className="border-border hover:bg-card bg-transparent">
            <X className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
