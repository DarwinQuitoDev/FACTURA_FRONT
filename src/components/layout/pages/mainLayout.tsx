// src/layouts/MainLayout.jsx
import Sidebar from "../components/sidebarLayout"
import Header from "../components/headerLayout"
import { ParticlesBackground } from "@/components/background/particlesBackground"
import { useTheme } from "@/contexts/appProvider"

const MainLayout = () => {
  const { resolvedTheme } = useTheme()

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
      </div>
    </div>
  )
}

export default MainLayout
