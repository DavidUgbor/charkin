"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0d1f3c",
            color: "#fff",
            border: "1px solid #1a2f4a",
          },
        }}
      />
    </SessionProvider>
  )
}
