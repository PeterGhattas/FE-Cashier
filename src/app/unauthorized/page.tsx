import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Card className="border-2 border-destructive/50">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            {/* Icon */}
            <div className="bg-destructive/10 text-destructive mb-8 rounded-full p-6">
              <ShieldAlert className="h-16 w-16" />
            </div>

            {/* Error Message */}
            <div className="mb-8 space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Access Denied
              </h1>
              <p className="text-muted-foreground text-lg">
                You don&apos;t have permission to access this page.
              </p>
              <p className="text-muted-foreground text-sm">
                This page requires specific permissions that your account doesn&apos;t have.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Go to Home</Link>
              </Button>
            </div>

            {/* Additional Help */}
            <div className="border-t mt-8 pt-8">
              <p className="text-muted-foreground text-sm">
                If you believe you should have access to this page, please{" "}
                <a href="#" className="text-primary underline underline-offset-4 hover:no-underline">
                  contact your administrator
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}