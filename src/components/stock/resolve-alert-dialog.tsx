"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconCheck,
  IconLoader,
  IconAlertTriangle,
  IconPackage,
  IconBox,
  IconNote,
} from "@tabler/icons-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ResolveStockAlertDocument } from "@/graphql/operations/stock/resolveStockAlert.generated"
import { StockAlertsDocument } from "@/graphql/operations/stock"
import { StockAlertType } from "@/graphql/generated/schema"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface ResolveAlertDialogProps {
  alert: StockAlertType
  onSuccess?: () => void
  children?: React.ReactNode
}

export function ResolveAlertDialog({
  alert,
  onSuccess,
  children,
}: ResolveAlertDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [notes, setNotes] = React.useState("")

  const [resolveAlert, { loading }] = useMutation(ResolveStockAlertDocument, {
    refetchQueries: [{ query: StockAlertsDocument }],
    onCompleted: () => {
      toast.success("Alert resolved", {
        description: "The stock alert has been resolved successfully.",
      })
      setOpen(false)
      setNotes("")
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to resolve alert", {
        description: error.message || "An error occurred while resolving the alert.",
      })
    },
  })

  const handleResolve = async () => {
    try {
      await resolveAlert({
        variables: {
          alertId: alert._id,
          notes: notes.trim() || undefined,
        },
      })
    } catch (error) {
      console.error("Error resolving alert:", error)
    }
  }

  const typeColors = {
    LOW_STOCK: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    OUT_OF_STOCK: "bg-red-500/10 text-red-500 border-red-500/20",
    CRITICAL: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  }

  React.useEffect(() => {
    if (!open) {
      setNotes("")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <IconCheck className="mr-2 size-4" />
            Resolve
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-green-500/10">
              <IconCheck className="size-6 text-green-500" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">
                Resolve Stock Alert
              </DialogTitle>
              <DialogDescription>
                Mark this stock alert as resolved with optional notes
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconAlertTriangle className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold">Alert Details</h3>
                </div>
                <Badge
                  variant="outline"
                  className={typeColors[alert.type as keyof typeof typeColors]}
                >
                  {alert.type.replace("_", " ")}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Product ID</p>
                  <div className="flex items-center gap-2">
                    <IconPackage className="size-4 text-muted-foreground" />
                    <p className="font-mono font-medium">{alert.productId}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Current Stock</p>
                  <div className="flex items-center gap-2">
                    <IconBox className="size-4 text-muted-foreground" />
                    <p className="font-medium">
                      {alert.currentQuantity} / {alert.minStockLevel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <IconNote className="size-4 text-muted-foreground" />
              <Label htmlFor="notes" className="text-base font-semibold">
                Resolution Notes
              </Label>
              <span className="text-muted-foreground text-sm">(Optional)</span>
            </div>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about how this alert was resolved (e.g., 'Restocked 50 units', 'Updated minimum level', etc.)"
              rows={4}
              className="resize-none"
            />
            <p className="text-muted-foreground text-xs">
              These notes will be saved with the alert for future reference
            </p>
          </div>

          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <div className="flex gap-3">
              <IconCheck className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  What happens when you resolve?
                </p>
                <ul className="text-muted-foreground ml-4 list-disc space-y-0.5 text-xs">
                  <li>Alert status will be changed to "Resolved"</li>
                  <li>Resolution timestamp and user will be recorded</li>
                  <li>Alert will be marked as complete</li>
                  <li>Your notes will be saved for documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-3">
            <p className="text-muted-foreground text-sm">
              {notes.trim() ? `${notes.trim().length} characters` : "No notes added"}
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleResolve}
                disabled={loading}
                className="min-w-[140px] bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <IconLoader className="mr-2 size-4 animate-spin" />
                    Resolving...
                  </>
                ) : (
                  <>
                    <IconCheck className="mr-2 size-4" />
                    Resolve Alert
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
