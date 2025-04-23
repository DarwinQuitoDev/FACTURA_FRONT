
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, ChevronLeft, ChevronRight, Command, Database, Globe, LucideIcon, MessageSquare, Settings, Shield, Terminal } from "lucide-react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { useTheme } from "@/contexts/appProvider"

const Sidebar = () => {
  // Dashboard states
  const { resolvedTheme } = useTheme()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left sidebar with independent scroll */}
      <div
        className={`${sidebarCollapsed ? "w-22" : "w-64"} transition-all duration-300 overflow-y-auto custom-scrollbar`}
      >
        <div className="p-4">
          <Card
            className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
              } backdrop-blur-sm h-full relative`}
          >
            <CardContent className="p-2">
              <Button variant="ghost" size="icon" onClick={toggleSidebar}
                className={`absolute -right-3 top-3 h-6 w-6 rounded-full 
                  ${resolvedTheme === "dark" ? "bg-slate-800 border-slate-700" 
                    : "bg-slate-200 border-slate-300"} border z-10 p-1`}
              >
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
              <nav className="space-y-1">
                <NavItem icon={Command} label="Panel Principal" active collapsed={sidebarCollapsed} theme={resolvedTheme} />
                <NavItem icon={Activity} label="Diagnósticos" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                <NavItem icon={Database} label="Centro de Datos" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                <NavItem icon={Globe} label="Red" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                <NavItem icon={Shield} label="Seguridad" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                <NavItem icon={Terminal} label="Consola" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                <NavItem icon={MessageSquare} label="Comunicaciones" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                <NavItem icon={Settings} label="Configuración" collapsed={sidebarCollapsed} theme={resolvedTheme} />
              </nav>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main content with independent scroll */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
        <div className="max-w-full mx-auto space-y-6">
          {/* System overview */}
          <Card
            className={`${resolvedTheme === "dark" ? "bg-slate-800 border-slate-600" : "bg-white/50 border-slate-200/50"
              } backdrop-blur-sm overflow-hidden`}>
            <Outlet />
          </Card>
        </div>
      </div>
    </div>
  )
}


function NavItem({
  icon: Icon,
  label,
  active,
  collapsed,
  theme,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  collapsed?: boolean
  theme: "dark" | "light"
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-${collapsed ? "center" : "start"} ${active
        ? theme === "dark"
          ? "bg-slate-800/70 text-cyan-400"
          : "bg-slate-200/70 text-blue-600"
        : theme === "dark"
          ? "text-slate-400 hover:text-slate-100"
          : "text-slate-500 hover:text-slate-900"
        }`}
    >
      <Icon className={collapsed ? "" : "mr-2"} size={collapsed ? 20 : 16} />
      {!collapsed && label}
    </Button>
  )
}

export default Sidebar
