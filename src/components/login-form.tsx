"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  useLoginMutation,
  useRegisterDeviceTokenMutation,
  useSetOnlineMutation,
} from "@/graphql/generated"
import { getFCMToken } from "@/lib/firebase-messaging"
import stockLine from "../../public/stocklink.png"
import Image from "next/image"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  const [registerDeviceToken] = useRegisterDeviceTokenMutation()
  const [setOnline] = useSetOnlineMutation()

  const [login, { loading }] = useLoginMutation({
    onCompleted: async (data) => {
      // Store the access token in cookies with security options
      Cookies.set("accessToken", data.login.accessToken, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
        sameSite: "strict", // Protect against CSRF
        path: "/", // Available across the entire site
      })

      // Store user data in cookies
      Cookies.set("user", JSON.stringify(data.login.user), {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })

      // Set user status to online
      try {
        await setOnline()
        console.log("User status set to online")
      } catch (error) {
        console.error("Failed to set online status:", error)
        // Don't block login if status update fails
      }

      // Register FCM device token for push notifications
      try {
        const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
        if (vapidKey) {
          const fcmToken = await getFCMToken(vapidKey)
          if (fcmToken) {
            await registerDeviceToken({
              variables: {
                token: fcmToken,
              },
            })
            // Store token in localStorage to unregister on logout
            localStorage.setItem("fcmToken", fcmToken)
            console.log("Device token registered successfully")
          }
        }
      } catch (error) {
        console.error("Failed to register device token:", error)
        // Don't block login if FCM registration fails
      }

      // Redirect to dashboard
      router.push("/dashboard")
    },
    onError: (error) => {
      setFormError(error.message || "Login failed. Please try again.")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!username || !password) {
      setFormError("Please enter both username and password")
      return
    }

    await login({
      variables: {
        loginInput: {
          username,
          password,
        },
      },
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:border-r md:pr-8 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your ERP System account
                </p>
              </div>
              {formError && (
                <FieldError>{formError}</FieldError>
              )}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block md:pl-8">
            <Image
              src={stockLine}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
