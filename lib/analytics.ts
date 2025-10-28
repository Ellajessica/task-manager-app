// Analytics utility for tracking user interactions and preferences
export interface AnalyticsEvent {
  eventName: string
  timestamp: string
  theme?: string
  userId?: string
  metadata?: Record<string, any>
}

class AnalyticsManager {
  private events: AnalyticsEvent[] = []
  private readonly STORAGE_KEY = "task_manager_analytics"
  private readonly MAX_EVENTS = 100

  constructor() {
    this.loadEvents()
  }

  trackEvent(eventName: string, metadata?: Record<string, any>) {
    const event: AnalyticsEvent = {
      eventName,
      timestamp: new Date().toISOString(),
      theme: this.getCurrentTheme(),
      metadata,
    }

    this.events.push(event)

    // Keep only recent events
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS)
    }

    this.saveEvents()
  }

  trackThemeChange(newTheme: string) {
    this.trackEvent("theme_changed", { newTheme })
  }

  trackTaskCreated() {
    this.trackEvent("task_created")
  }

  trackTaskCompleted() {
    this.trackEvent("task_completed")
  }

  trackTaskDeleted() {
    this.trackEvent("task_deleted")
  }

  trackFilterApplied(filterType: string) {
    this.trackEvent("filter_applied", { filterType })
  }

  getEvents(): AnalyticsEvent[] {
    return this.events
  }

  getThemePreference(): { dark: number; light: number } {
    const themeEvents = this.events.filter((e) => e.eventName === "theme_changed")
    return {
      dark: themeEvents.filter((e) => e.metadata?.newTheme === "dark").length,
      light: themeEvents.filter((e) => e.metadata?.newTheme === "light").length,
    }
  }

  getEventStats() {
    const stats: Record<string, number> = {}
    this.events.forEach((event) => {
      stats[event.eventName] = (stats[event.eventName] || 0) + 1
    })
    return stats
  }

  private getCurrentTheme(): string {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light"
    }
    return "light"
  }

  private saveEvents() {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events))
    }
  }

  private loadEvents() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        try {
          this.events = JSON.parse(stored)
        } catch {
          this.events = []
        }
      }
    }
  }

  clearEvents() {
    this.events = []
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.STORAGE_KEY)
    }
  }
}

export const analytics = new AnalyticsManager()
