import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Card className="border-2">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            {/* 404 Animation */}
            <div className="relative mb-8">
              <div className="text-[120px] font-bold leading-none tracking-tighter md:text-[180px]">
                <span className="bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">
                  404
                </span>
              </div>
              <div className="absolute inset-0 -z-10 blur-3xl">
                <div className="bg-primary/20 h-full w-full rounded-full"></div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8 space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Page Not Found
              </h1>
              <p className="text-muted-foreground text-lg">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
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
                If you think this is a mistake, please{" "}
                <a href="#" className="text-primary underline underline-offset-4 hover:no-underline">
                  contact support
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <div className="mt-8 grid grid-cols-3 gap-4 opacity-50">
          <div className="bg-muted h-2 rounded-full"></div>
          <div className="bg-muted h-2 rounded-full"></div>
          <div className="bg-muted h-2 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
