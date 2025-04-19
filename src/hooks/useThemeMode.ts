// src/hooks/useThemeMode.ts
import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useThemeMode(defaultMode: "light" | "dark" | "system" = "system") {
  const [themeMode, setThemeMode] = useState(defaultMode)
  const [resolvedTheme, setResolvedTheme] = useState<Theme>("dark")

  useEffect(() => {
    const updateTheme = () => {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const theme = themeMode === "system" ? (systemDark ? "dark" : "light") : themeMode
      setResolvedTheme(theme)
    }

    updateTheme()

    if (themeMode === "system") {
      const listener = window.matchMedia("(prefers-color-scheme: dark)")
      listener.addEventListener("change", updateTheme)
      return () => listener.removeEventListener("change", updateTheme)
    }
  }, [themeMode])

  return { themeMode, setThemeMode, resolvedTheme }
}
