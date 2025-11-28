// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Helper function to format month (YYYY-MM to Month Year)
export function formatMonth(month: string): string {
  if (!month) return "N/A"
  try {
    const [year, monthNum] = month.split("-")
    const date = new Date(parseInt(year), parseInt(monthNum) - 1)
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  } catch {
    return month
  }
}

// Helper function to format date
export function formatDate(date: string): string {
  if (!date) return "N/A"
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Helper function to format date and time
export function formatDateTime(date: string): string {
  if (!date) return "N/A"
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Helper function to format time for input
export function formatTimeForInput(time: string | null | undefined): string {
  if (!time) return ""
  // Handle ISO date string or time string
  if (time.includes("T")) {
    const date = new Date(time)
    return date.toTimeString().slice(0, 5) // HH:mm format
  }
  return time.slice(0, 5) // Assume it's already in HH:mm:ss format
}

// Helper function to format date for input
export function formatDateForInput(date: string): string {
  if (!date) return ""
  // Handle ISO date string
  if (date.includes("T")) {
    return date.split("T")[0]
  }
  return date
}

// Helper function to convert date string to ISO 8601
export function formatDateToISO(date: string): string {
  if (!date) return ""
  // If already ISO format, return as is
  if (date.includes("T")) return date
  // Convert YYYY-MM-DD to ISO 8601
  const dateObj = new Date(date)
  return dateObj.toISOString()
}

// Helper function to format time for display
export function formatTimeForDisplay(time: string | null | undefined): string {
  if (!time) return "-"
  // Handle ISO date string or time string
  if (time.includes("T")) {
    const date = new Date(time)
    return date.toTimeString().slice(0, 5) // HH:mm format
  }
  return time.slice(0, 5) // Assume it's already in HH:mm:ss format
}

// Helper function to calculate hours worked
export function calculateHoursWorked(
  entryTime: string | null | undefined,
  exitTime: string | null | undefined
): string {
  if (!entryTime || !exitTime) return "-"

  const entry = new Date(`2000-01-01T${formatTimeForDisplay(entryTime)}:00`)
  const exit = new Date(`2000-01-01T${formatTimeForDisplay(exitTime)}:00`)

  const diffMs = exit.getTime() - entry.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)

  if (diffHours < 0) return "-"

  const hours = Math.floor(diffHours)
  const minutes = Math.round((diffHours - hours) * 60)

  return `${hours}h ${minutes}m`
}
