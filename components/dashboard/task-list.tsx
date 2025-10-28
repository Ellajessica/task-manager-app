"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { TaskCard } from "./task-card"
import { Card, CardContent } from "@/components/ui/card"
import { apiClient } from "@/lib/api-client"
import { Loader2 } from "lucide-react"
import { analytics } from "@/lib/analytics"

interface Task {
  id: number
  title: string
  description: string
  due_date: string
  priority: "low" | "medium" | "high"
  completed: boolean
  tags: string[]
  created_at: string
  updated_at: string
}

interface TaskListProps {
  tasks: Task[]
  isLoading: boolean
  onEditTask: (task: Task) => void
  onTasksChange: () => void
}

export function TaskList({ tasks, isLoading, onEditTask, onTasksChange }: TaskListProps) {
  const deleteMutation = useMutation({
    mutationFn: async (taskId: number) => {
      await apiClient.delete(`/tasks/${taskId}/`)
    },
    onSuccess: () => {
      analytics.trackTaskDeleted()
      toast.success("Task deleted")
      onTasksChange()
    },
    onError: () => {
      toast.error("Failed to delete task")
    },
  })

  const toggleCompleteMutation = useMutation({
    mutationFn: async (task: Task) => {
      const response = await apiClient.patch(`/tasks/${task.id}/`, {
        completed: !task.completed,
      })
      return response.data
    },
    onSuccess: (data) => {
      if (data.completed) {
        analytics.trackTaskCompleted()
      }
      toast.success("Task updated")
      onTasksChange()
    },
    onError: () => {
      toast.error("Failed to update task")
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="py-12 text-center">
          <p className="text-muted text-lg">No tasks found. Create one to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => onEditTask(task)}
          onDelete={() => deleteMutation.mutate(task.id)}
          onToggleComplete={() => toggleCompleteMutation.mutate(task)}
          isDeleting={deleteMutation.isPending}
          isToggling={toggleCompleteMutation.isPending}
        />
      ))}
    </div>
  )
}
