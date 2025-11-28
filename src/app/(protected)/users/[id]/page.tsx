"use client"

import { useParams } from "next/navigation"
import { UserProfile } from "@/components/users/user-profile"

export default function UserDetailPage() {
  const params = useParams()
  const userId = params.id as string

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        <UserProfile userId={userId} />
      </div>
    </div>
  )
}