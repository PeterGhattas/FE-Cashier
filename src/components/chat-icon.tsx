import * as React from "react"
import { IconMessage } from "@tabler/icons-react"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ChatIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon variant to use
   * @default "tabler"
   */
  variant?: "tabler" | "lucide"
  /**
   * Size of the icon (applies to both width and height)
   * @default 24
   */
  size?: number
  /**
   * Whether to show an unread badge
   * @default false
   */
  showBadge?: boolean
  /**
   * Number of unread messages (shown if showBadge is true)
   */
  badgeCount?: number
  /**
   * Additional className for the badge
   */
  badgeClassName?: string
}

export function ChatIcon({
  variant = "tabler",
  size = 24,
  showBadge = false,
  badgeCount,
  badgeClassName,
  className,
  ...props
}: ChatIconProps) {
  const IconComponent = variant === "lucide" ? MessageCircle : IconMessage
  const iconSize = variant === "lucide" ? size : undefined
  const iconClassName = variant === "lucide" ? className : cn(className)

  return (
    <div className="relative inline-flex" {...props}>
      <IconComponent
        className={iconClassName}
        size={iconSize}
        width={variant === "tabler" ? size : undefined}
        height={variant === "tabler" ? size : undefined}
      />
      {showBadge && badgeCount !== undefined && badgeCount > 0 && (
        <span
          className={cn(
            "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-destructive-foreground text-xs font-medium",
            badgeClassName
          )}
        >
          {badgeCount > 99 ? "99+" : badgeCount}
        </span>
      )}
    </div>
  )
}