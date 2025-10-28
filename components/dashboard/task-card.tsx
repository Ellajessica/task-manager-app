"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface Task {
  id: number
  title: string
  description: string
  due_date: string
  priority: "low" | "medium" | "high"
  completed: boolean
  tags: string[]
}

interface TaskCardProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
  onToggleComplete: () => void
  isDeleting: boolean
  isToggling: boolean
}

const priorityColors = {
  low: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  high: "bg-red-500/20 text-red-300 border-red-500/30",
}

export function TaskCard({ task, onEdit, onDelete, onToggleComplete, isDeleting, isToggling }: TaskCardProps) {
  return (
    <Card className={`border-border bg-card hover:bg-card/80 transition-colors ${task.completed ? "opacity-60" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox checked={task.completed} onChange={onToggleComplete} disabled={isToggling} className="mt-1" />
            <div className="flex-1">
              <h3 className={`font-semibold text-foreground ${task.completed ? "line-through text-muted" : ""}`}>
                {task.title}
              </h3>
              <p className="text-sm text-muted mt-1 line-clamp-2">{task.description}</p>
            </div>
          </div>
          <Badge className={`${priorityColors[task.priority]} border`}>{task.priority}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted">Due: {format(new Date(task.due_date), "MMM dd, yyyy")}</div>
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onEdit}
            className="flex-1 border-border hover:bg-card bg-transparent"
          >
            <Edit2 className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onDelete}
            disabled={isDeleting}
            className="flex-1 border-border hover:bg-red-500/10 hover:text-red-400 bg-transparent"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
