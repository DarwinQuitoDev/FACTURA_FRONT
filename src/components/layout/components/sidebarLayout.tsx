import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Package,
  ShoppingCart,
  Receipt,
  Wallet,
  Settings,
  Notebook,
  ChevronDown,

  Home
} from "lucide-react"
import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { useTheme } from "@/contexts/appProvider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const modules = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Users,
    label: "Cumplimiento ",
    path: "/cumplimiento",
    submodules: [
      { label: "Lista de cumplimiento", path: "/cumplimiento/listas" },
    ],
  },
  {
    icon: Users,
    label: "Configuración ",
    path: "/configuracion",
    submodules: [
      { label: "Usuarios", path: "/configuracion/usuarios" },
      { label: "Roles", path: "/configuracion/usuarios" },
    ],
  }
]

const Sidebar = () => {
  const { resolvedTheme } = useTheme()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

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
                {modules.map((module) => (
                  module.submodules ? (
                    <Collapsible key={module.path}>
                      <CollapsibleTrigger className="w-full">
                        <Button
                          variant="ghost"
                          className={`w-full justify-${sidebarCollapsed ? "center" : "between"} ${
                            location.pathname.startsWith(module.path)
                              ? resolvedTheme === "dark"
                                ? "bg-slate-800/70 text-cyan-400"
                                : "bg-slate-200/70 text-blue-600"
                              : resolvedTheme === "dark"
                                ? "text-slate-400 hover:text-slate-100"
                                : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center">
                            <module.icon className={sidebarCollapsed ? "" : "mr-2"} size={sidebarCollapsed ? 20 : 16} />
                            {!sidebarCollapsed && module.label}
                          </div>
                          {!sidebarCollapsed && <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {!sidebarCollapsed && module.submodules.map((submodule) => (
                          <Link key={submodule.path} to={submodule.path}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start pl-8 ${
                                location.pathname === submodule.path
                                  ? resolvedTheme === "dark"
                                    ? "bg-slate-800/70 text-cyan-400"
                                    : "bg-slate-200/70 text-blue-600"
                                  : resolvedTheme === "dark"
                                    ? "text-slate-400 hover:text-slate-100"
                                    : "text-slate-500 hover:text-slate-900"
                              }`}
                            >
                              {submodule.label}
                            </Button>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link key={module.path} to={module.path}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-${sidebarCollapsed ? "center" : "start"} ${
                          location.pathname === module.path
                            ? resolvedTheme === "dark"
                              ? "bg-slate-800/70 text-cyan-400"
                              : "bg-slate-200/70 text-blue-600"
                            : resolvedTheme === "dark"
                              ? "text-slate-400 hover:text-slate-100"
                              : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        <module.icon className={sidebarCollapsed ? "" : "mr-2"} size={sidebarCollapsed ? 20 : 16} />
                        {!sidebarCollapsed && module.label}
                      </Button>
                    </Link>
                  )
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main content with independent scroll */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
        <div className="max-w-full mx-auto space-y-6">
          <Card
            className={`${resolvedTheme === "dark" ? "bg-slate-800 border-slate-600" : "bg-white border-slate-200/50"
              } shadow-xl backdrop-blur-sm overflow-hidden p-6`}>
            <Outlet />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
