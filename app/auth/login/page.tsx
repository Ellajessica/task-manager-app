import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-card p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Task Manager</h1>
          <p className="text-muted">Sign in to manage your tasks</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
