"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { TaskList } from "./task-list"
import { TaskFilters } from "./task-filters"
import { TaskModal } from "./task-modal"
import { AnalyticsSummary } from "./analytics-summary"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { apiClient } from "@/lib/api-client"

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

export function TaskDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    tag: "",
    search: "",
  })

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters.status !== "all") {
        params.append("completed", filters.status === "completed" ? "true" : "false")
      }
      if (filters.priority !== "all") {
        params.append("priority", filters.priority)
      }
      if (filters.tag) {
        params.append("tags", filters.tag)
      }
      if (filters.search) {
        params.append("search", filters.search)
      }

      const response = await apiClient.get(`/tasks/?${params.toString()}`)
      return response.data
    },
  })

  const handleOpenModal = (task?: Task) => {
    if (task) {
      setEditingTask(task)
    } else {
      setEditingTask(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const handleTaskSaved = () => {
    handleCloseModal()
    refetch()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Your Tasks</h2>
          <p className="text-muted mt-1">Manage and track your daily tasks</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <AnalyticsSummary tasks={tasks} />

      <TaskFilters filters={filters} onFiltersChange={setFilters} />

      <TaskList tasks={tasks} isLoading={isLoading} onEditTask={handleOpenModal} onTasksChange={refetch} />

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTask={editingTask}
        onTaskSaved={handleTaskSaved}
      />
    </div>
  )
}
