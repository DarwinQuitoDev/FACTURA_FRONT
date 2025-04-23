// src/layouts/MainLayout.jsx
import Sidebar from "../components/sidebarLayout"
import Header from "../components/headerLayout"
import { ParticlesBackground } from "@/components/background/particlesBackground"
import { useTheme } from "@/contexts/appProvider"
import { useAuth } from "@/contexts/authProvider"
import { Navigate } from "react-router-dom"

const MainLayout = () => {
  const { resolvedTheme } = useTheme()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div
      className={`${resolvedTheme} min-h-screen ${resolvedTheme === "dark"
        ? "bg-gradient-to-br from-black to-slate-900 text-slate-100"
        : "bg-gradient-to-br from-slate-100 to-white text-slate-800"
        } relative overflow-hidden`}
    >
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
