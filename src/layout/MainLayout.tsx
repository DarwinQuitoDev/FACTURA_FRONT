// src/layouts/MainLayout.jsx
import Sidebar from "./components/SidebarLayout"
import Header from "./components/HeaderLayout"
import { ParticlesBackground } from "@/components/bg/ParticlesBackground/ParticlesBackground"
import { Card, CardContent } from "@/components/ui/card"
import { useClock } from "@/hooks/useClock"
import { useTheme } from "@/contexts/ThemeProvider"

const MainLayout = () => {
  const { resolvedTheme } = useTheme()
  const { time, date } = useClock()

  return (
    <div
      className={`${resolvedTheme} min-h-screen ${resolvedTheme === "dark"
        ? "bg-gradient-to-br from-black to-slate-900 text-slate-100"
        : "bg-gradient-to-br from-slate-100 to-white text-slate-800"
        } relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <ParticlesBackground
        theme={resolvedTheme}
        className="z-0"
        particleCount={500}
        opacity={0.3}
      />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="w-80 overflow-y-auto custom-scrollbar p-4">
          <div className="space-y-6">
            {/* System time */}
            <Card
              className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                } backdrop-blur-sm overflow-hidden`}
            >
              <CardContent className="p-0">
                <div
                  className={`${resolvedTheme === "dark"
                    ? "bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700/50"
                    : "bg-gradient-to-br from-slate-100 to-white border-b border-slate-200/50"
                    } p-6`}
                >
                  <div className="text-center">
                    <div
                      className={`text-xs ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"
                        } mb-1 font-mono`}
                    >
                      HORA DEL SISTEMA
                    </div>
                    <div
                      className={`text-3xl font-mono ${resolvedTheme === "dark" ? "text-cyan-400" : "text-blue-600"
                        } mb-1`}
                    >
                      {time}
                    </div>
                    <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      {date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
