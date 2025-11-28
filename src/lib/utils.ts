import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to extract error message
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === "string") {
    return error
  }
  return "An unknown error occurred"
}

// Helper function to get initials from full name
export function getInitials(fullName: string): string {
  if (!fullName) return ""
  const names = fullName.split(" ")
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
  return fullName.substring(0, 2).toUpperCase()
}

// Phone number formatting utilities
export function formatPhoneNumber(value: string): string {
  // Remove all non-numeric characters except +
  const cleaned = value.replace(/[^\d+]/g, "")

  // If it starts with +, format as international number
  if (cleaned.startsWith("+")) {
    const country = cleaned.slice(0, 3) // +20, +1, etc.
    const rest = cleaned.slice(3)

    // Format the rest in groups of 3
    const groups: string[] = []
    for (let i = 0; i < rest.length; i += 3) {
      groups.push(rest.slice(i, i + 3))
    }

    return `${country} ${groups.join(" ")}`.trim()
  }

  // Otherwise, just add spaces every 3 digits
  const groups: string[] = []
  for (let i = 0; i < cleaned.length; i += 3) {
    groups.push(cleaned.slice(i, i + 3))
  }

  return groups.join(" ").trim()
}

export function cleanPhoneNumber(value: string): string {
  // Remove all non-numeric characters except +
  return value.replace(/[^\d+]/g, "")
}

export function validatePhoneNumber(value: string): boolean {
  if (!value) return true // Empty is valid (field is required at schema level)

  const cleaned = cleanPhoneNumber(value)

  // Basic validation: must start with + and have at least 10 digits
  if (cleaned.startsWith("+")) {
    return cleaned.length >= 11 // + and at least 10 digits
  }

  // Without +, at least 10 digits
  return cleaned.length >= 10
}
