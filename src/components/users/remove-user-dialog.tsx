"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import { IconAlertTriangle, IconLoader, IconTrash } from "@tabler/icons-react"
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
import { RemoveUserDocument, UsersDocument } from "@/graphql/operations/users"
import { UserType } from "@/graphql/generated/schema"

interface RemoveUserDialogProps {
  user: UserType
  onSuccess?: () => void
  children?: React.ReactNode
}

export function RemoveUserDialog({
  user,
  onSuccess,
  children,
}: RemoveUserDialogProps) {
  const [open, setOpen] = React.useState(false)

  const [removeUser, { loading }] = useMutation(RemoveUserDocument, {
    refetchQueries: [{ query: UsersDocument }],
    onCompleted: () => {
      toast.success("User deleted", {
        description: `${user.fullName} has been successfully removed.`,
      })
      setOpen(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to delete user", {
        description: error.message || "An error occurred while deleting the user.",
      })
    },
  })

  const handleRemove = async () => {
    try {
      await removeUser({
        variables: {
          id: user._id,
        },
      })
    } catch (error) {
      console.error("Error removing user:", error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children || (
          <Button variant="destructive" size="sm">
            <IconTrash className="size-4" />
            Delete User
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10">
              <IconAlertTriangle className="size-5 text-destructive" />
            </div>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-3">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {user.fullName}
            </span>{" "}
            (@{user.username})?
            <br />
            <br />
            This action cannot be undone. This will permanently delete the user
            account and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role:</span>
              <span className="font-medium">
                {user.role.replace(/_/g, " ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{user.phoneNumber}</span>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleRemove()
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
                Delete User
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
