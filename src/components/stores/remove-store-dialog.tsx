"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconAlertTriangle,
  IconLoader,
  IconTrash,
  IconBuilding,
  IconMapPin,
  IconShield,
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
import { DeleteStoreDocument, StoresDocument } from "@/graphql/operations/stores"
import { StoreType } from "@/graphql/generated/schema"
import { Separator } from "@/components/ui/separator"

interface RemoveStoreDialogProps {
  store: StoreType
  onSuccess?: () => void
  children?: React.ReactNode
}

export function RemoveStoreDialog({
  store,
  onSuccess,
  children,
}: RemoveStoreDialogProps) {
  const [open, setOpen] = React.useState(false)

  const [deleteStore, { loading }] = useMutation(DeleteStoreDocument, {
    refetchQueries: [{ query: StoresDocument }],
    onCompleted: () => {
      toast.success("Store deleted", {
        description: `${store.name} has been successfully deleted.`,
      })
      setOpen(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to delete store", {
        description: error.message || "An error occurred while deleting the store.",
      })
    },
  })

  const handleDelete = async () => {
    try {
      await deleteStore({
        variables: { id: store._id },
      })
    } catch (error) {
      console.error("Error deleting store:", error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children || (
          <Button variant="destructive" size="sm">
            <IconTrash className="mr-2 size-4" />
            Delete Store
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
              <IconAlertTriangle className="size-6 text-destructive" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-2xl">
                Delete Store
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                store and remove all associated data.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-start gap-4">
              {store.logo ? (
                <img
                  src={store.logo}
                  alt={store.name}
                  className="size-16 rounded-lg border-2 border-background object-cover shadow-sm"
                />
              ) : (
                <div className="flex size-16 items-center justify-center rounded-lg border-2 border-background bg-gradient-to-br from-primary/20 to-primary/5 shadow-sm">
                  <IconBuilding className="size-8 text-primary" />
                </div>
              )}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{store.name}</h3>
                  {store.description && (
                    <p className="text-muted-foreground text-sm">
                      {store.description}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <IconMapPin className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {store.city}, {store.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconShield className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground capitalize">
                      {store.subscriptionPlan}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex gap-3">
              <IconAlertTriangle className="size-5 text-destructive mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">
                  Warning: This action is irreversible
                </p>
                <p className="text-muted-foreground text-xs">
                  Deleting this store will remove:
                </p>
                <ul className="text-muted-foreground ml-4 list-disc space-y-0.5 text-xs">
                  <li>All store information and settings</li>
                  <li>Associated products and inventory</li>
                  <li>Sales records and invoices</li>
                  <li>Assigned users and permissions</li>
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
              handleDelete()
            }}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? (
              <>
                <IconLoader className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <IconTrash className="mr-2 size-4" />
                Delete Store
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
