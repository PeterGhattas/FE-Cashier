"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconCheck,
  IconLoader,
  IconAlertTriangle,
  IconPackage,
  IconBox,
} from "@tabler/icons-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AcknowledgeStockAlertDocument } from "@/graphql/operations/stock/acknowledgeStockAlert.generated"
import { StockAlertsDocument } from "@/graphql/operations/stock"
import { StockAlertType } from "@/graphql/generated/schema"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface AcknowledgeAlertDialogProps {
  alert: StockAlertType
  onSuccess?: () => void
  children?: React.ReactNode
}

export function AcknowledgeAlertDialog({
  alert,
  onSuccess,
  children,
}: AcknowledgeAlertDialogProps) {
  const [open, setOpen] = React.useState(false)

  const [acknowledgeAlert, { loading }] = useMutation(AcknowledgeStockAlertDocument, {
    refetchQueries: [{ query: StockAlertsDocument }],
    onCompleted: () => {
      toast.success("Alert acknowledged", {
        description: "The stock alert has been acknowledged successfully.",
      })
      setOpen(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to acknowledge alert", {
        description: error.message || "An error occurred while acknowledging the alert.",
      })
    },
  })

  const handleAcknowledge = async () => {
    try {
      await acknowledgeAlert({
        variables: { alertId: alert._id },
      })
    } catch (error) {
      console.error("Error acknowledging alert:", error)
    }
  }

  const typeColors = {
    LOW_STOCK: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    OUT_OF_STOCK: "bg-red-500/10 text-red-500 border-red-500/20",
    CRITICAL: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <IconCheck className="mr-2 size-4" />
            Acknowledge
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <IconCheck className="size-6 text-primary" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-2xl">
                Acknowledge Stock Alert
              </AlertDialogTitle>
              <AlertDialogDescription>
                Confirm that you have reviewed this stock alert
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

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

              <div className="rounded-lg bg-muted p-3">
                <div className="flex items-center gap-2">
                  <IconAlertTriangle className="size-4 text-yellow-500" />
                  <p className="text-sm font-medium">
                    Stock level is {alert.minStockLevel - alert.currentQuantity} units below minimum
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex gap-3">
              <IconCheck className="size-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-primary">
                  What happens when you acknowledge?
                </p>
                <ul className="text-muted-foreground ml-4 list-disc space-y-0.5 text-xs">
                  <li>Alert status will be changed to "Acknowledged"</li>
                  <li>Timestamp and user will be recorded</li>
                  <li>Alert will remain visible until resolved</li>
                  <li>You can still resolve this alert later</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleAcknowledge()
            }}
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? (
              <>
                <IconLoader className="mr-2 size-4 animate-spin" />
                Acknowledging...
              </>
            ) : (
              <>
                <IconCheck className="mr-2 size-4" />
                Acknowledge Alert
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}