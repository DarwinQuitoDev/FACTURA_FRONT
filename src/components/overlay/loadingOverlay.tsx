"use client"

import { Activity, type LucideIcon } from "lucide-react"

interface LoadingOverlayProps {
  isLoading: boolean
  theme?: "dark" | "light"
  message?: string
  icon?: LucideIcon
}

export function LoadingOverlay({
  isLoading,
  theme = "dark",
  message = "INICIANDO SISTEMA",
  icon: Icon = Activity,
}: LoadingOverlayProps) {
  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        theme === "dark" ? "bg-black/80" : "bg-white/80"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Spinner animation */}
        <div className="relative w-24 h-24">
          <div
            className={`absolute inset-0 border-4 ${
              theme === "dark" ? "border-cyan-500/30" : "border-blue-500/30"
            } rounded-full animate-ping`}
          ></div>
          <div
            className={`absolute inset-2 border-4 ${
              theme === "dark" ? "border-t-cyan-500" : "border-t-blue-500"
            } border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
          ></div>
          <div
            className={`absolute inset-4 border-4 ${
              theme === "dark" ? "border-r-purple-500" : "border-r-indigo-500"
            } border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow`}
          ></div>
          <div
            className={`absolute inset-6 border-4 ${
              theme === "dark" ? "border-b-blue-500" : "border-b-sky-500"
            } border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower`}
          ></div>
          <div
            className={`absolute inset-8 border-4 ${
              theme === "dark" ? "border-l-green-500" : "border-l-emerald-500"
            } border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin`}
          ></div>
        </div>

        {/* Progress bar with proper implementation */}
        <div className={`w-48 mt-4 h-1.5 rounded-full ${
          theme === "dark" ? "bg-slate-700" : "bg-slate-200"
        }`}>
          <div
            className={`h-full rounded-full ${
              theme === "dark" ? "bg-cyan-500" : "bg-blue-500"
            } animate-pulse`}
            style={{ width: "100%" }}
          />
        </div>

        {/* Message with icon */}
        <div
          className={`mt-4 flex items-center ${
            theme === "dark" ? "text-cyan-500" : "text-blue-600"
          } font-mono text-sm tracking-wider`}
        >
          <Icon className="h-4 w-4 mr-2" />
          {message}
        </div>
      </div>
    </div>
  )
}