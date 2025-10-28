import { TaskDashboard } from "@/components/dashboard/task-dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <TaskDashboard />
      </main>
    </div>
  )
}
