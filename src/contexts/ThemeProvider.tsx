import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type Theme = "light" | "dark"
type ThemeMode = "light" | "dark" | "system"

interface ThemeContextType {
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  resolvedTheme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("system")
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

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider")
  return context
}