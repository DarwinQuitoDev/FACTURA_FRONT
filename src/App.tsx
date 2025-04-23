"use client"

import { useEffect, useState} from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  CircleOff,
  Command,
  Computer,
  Cpu,
  Database,
  Download,
  Globe,
  HardDrive,
  Hexagon,
  LineChart,
  Lock,
  type LucideIcon,
  MessageSquare,
  Mic,
  Moon,
  Radio,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sun,
  Terminal,
  Wifi,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

//COMPONENTE DE PARTICULAS BACKGROUND
import { ParticlesBackground } from "./components/ParticlesBackground/ParticlesBackground"
import { LoadingOverlay } from "./components/overlay/loadingOverlay"

export default function App() {
  // Theme states
  const [themeMode, setThemeMode] = useState<"dark" | "light" | "system">("system")
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark")

  // Dashboard states
  const [systemStatus, setSystemStatus] = useState(85)
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [securityLevel] = useState(75)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Notification states
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Actualización del Sistema Disponible",
      description: "Versión 12.4.5 lista para instalar",
      time: "hace 10 minutos",
      read: false,
      type: "update",
    },
    {
      id: 2,
      title: "Alerta de Seguridad",
      description: "Intento de inicio de sesión inusual detectado",
      time: "hace 25 minutos",
      read: false,
      type: "warning",
    },
    {
      id: 3,
      title: "Copia de Seguridad Completada",
      description: "Copia de seguridad diaria completada con éxito",
      time: "hace 1 hora",
      read: true,
      type: "success",
    },
    {
      id: 4,
      title: "Estado de la Red",
      description: "Conexión optimizada para la carga actual",
      time: "hace 2 horas",
      read: true,
      type: "info",
    },
  ])

  // Search states
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)


  // System theme detection
  useEffect(() => {
    // Check if system prefers dark mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (themeMode === "system") {
        setResolvedTheme(mediaQuery.matches ? "dark" : "light")
      }
    }

    // Set initial value
    handleChange()

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [themeMode])

  // Update resolved theme when theme mode changes
  useEffect(() => {
    if (themeMode === "dark") {
      setResolvedTheme("dark")
    } else if (themeMode === "light") {
      setResolvedTheme("light")
    } else {
      // If system, check system preference
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      setResolvedTheme(isDarkMode ? "dark" : "light")
    }
  }, [themeMode])

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
      setSystemStatus(Math.floor(Math.random() * 10) + 80)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.trim() === "") {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      // Mock search results
      const results = [
        { id: 1, type: "comando", title: "Diagnóstico del Sistema", icon: Activity },
        { id: 2, type: "archivo", title: "Informe de Seguridad.pdf", icon: Shield },
        { id: 3, type: "configuración", title: "Configuración de Red", icon: Wifi },
        { id: 4, type: "aplicación", title: "Terminal", icon: Terminal },
        { id: 5, type: "contacto", title: "Administrador del Sistema", icon: User },
      ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get unread notification count
  const unreadCount = notifications.filter((n) => !n.read).length

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

      {/* Loading overlay */}
      <LoadingOverlay
        isLoading={isLoading}
        message="CARGANDO..."
      />

      <div className="flex flex-col h-screen relative z-10">
        {/* Header - fixed at top */}
        <header
          className={`flex items-center justify-between py-4 px-6 border-b ${resolvedTheme === "dark" ? "border-slate-700/50 bg-black/50" : "border-slate-200 bg-white/50"
            } backdrop-blur-sm z-20 sticky top-0`}
        >
          <div className="flex items-center space-x-2">
            <Hexagon className={`h-8 w-8 ${resolvedTheme === "dark" ? "text-cyan-500" : "text-blue-600"}`} />
            <span
              className={`text-xl font-bold bg-gradient-to-r ${resolvedTheme === "dark" ? "from-cyan-400 to-blue-500" : "from-blue-600 to-indigo-600"
                } bg-clip-text text-transparent`}
            >
              SISTEMA DE FACTURACION
            </span>
          </div>

          <div className="flex items-center space-x-6">
            {/* Search */}
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className={`hidden md:flex items-center space-x-1 ${resolvedTheme === "dark"
                    ? "bg-slate-800/50 border-slate-700/50"
                    : "bg-slate-200/50 border-slate-300/50"
                    } rounded-full px-3 py-1.5 border backdrop-blur-sm cursor-pointer`}
                >
                  <Search className={`h-4 w-4 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
                  <input
                    type="text"
                    placeholder="Buscar en el sistema..."
                    className={`bg-transparent border-none focus:outline-none text-sm w-40 ${resolvedTheme === "dark"
                      ? "placeholder:text-slate-500 text-slate-200"
                      : "placeholder:text-slate-400 text-slate-700"
                      }`}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className={`w-80 p-0 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
                  } custom-scrollbar`}
                align="end"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Search className={`h-4 w-4 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
                    <input
                      type="text"
                      placeholder="Buscar en el sistema..."
                      className={`bg-transparent border-none focus:outline-none text-sm flex-1 ${resolvedTheme === "dark"
                        ? "placeholder:text-slate-500 text-slate-200"
                        : "placeholder:text-slate-400 text-slate-700"
                        }`}
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      autoFocus
                    />
                    {searchQuery && (
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleSearch("")}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {isSearching ? (
                    <div className="flex justify-center py-8">
                      <div
                        className={`animate-spin h-6 w-6 border-2 rounded-full ${resolvedTheme === "dark"
                          ? "border-slate-600 border-t-cyan-500"
                          : "border-slate-200 border-t-blue-600"
                          }`}
                      ></div>
                    </div>
                  ) : searchQuery && searchResults.length === 0 ? (
                    <div
                      className={`text-center py-8 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                    >
                      No se encontraron resultados para "{searchQuery}"
                    </div>
                  ) : searchQuery ? (
                    <div className="max-h-80 overflow-auto custom-scrollbar">
                      {searchResults.map((result) => (
                        <div
                          key={result.id}
                          className={`flex items-center p-2 rounded-md cursor-pointer ${resolvedTheme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-100"
                            }`}
                        >
                          <div
                            className={`p-2 rounded-md mr-3 ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-200"
                              }`}
                          >
                            <result.icon
                              className={`h-4 w-4 ${resolvedTheme === "dark" ? "text-cyan-500" : "text-blue-600"}`}
                            />
                          </div>
                          <div>
                            <div
                              className={`text-sm font-medium ${resolvedTheme === "dark" ? "text-slate-200" : "text-slate-700"
                                }`}
                            >
                              {result.title}
                            </div>
                            <div
                              className={`text-xs ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                            >
                              {result.type}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`text-center py-4 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                    >
                      Escribe para buscar...
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative ${resolvedTheme === "dark"
                      ? "text-slate-400 hover:text-slate-100"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span
                        className={`absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] font-bold rounded-full ${resolvedTheme === "dark" ? "bg-cyan-500 text-black" : "bg-blue-600 text-white"
                          }`}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={`w-80 p-0 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
                    } custom-scrollbar`}
                  align="end"
                >
                  <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className={`font-medium ${resolvedTheme === "dark" ? "text-slate-200" : "text-slate-900"}`}>
                      Notificaciones
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllNotifications}
                      className={`text-xs ${resolvedTheme === "dark"
                        ? "text-slate-400 hover:text-slate-300"
                        : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                      Marcar todas como leídas
                    </Button>
                  </div>

                  <div className="max-h-80 overflow-auto custom-scrollbar">
                    {notifications.length === 0 ? (
                      <div
                        className={`p-4 text-center ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                      >
                        No hay notificaciones
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b last:border-0 ${resolvedTheme === "dark" ? "border-slate-700" : "border-slate-100"
                            } ${notification.read ? "" : resolvedTheme === "dark" ? "bg-slate-800/50" : "bg-slate-50"}`}
                        >
                          <div className="flex items-start">
                            <div
                              className={`mt-0.5 p-1.5 rounded-full mr-3 ${getNotificationTypeStyles(notification.type, resolvedTheme).bg}`}
                            >
                              {getNotificationTypeIcon(notification.type, resolvedTheme)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4
                                  className={`text-sm font-medium ${resolvedTheme === "dark" ? "text-slate-200" : "text-slate-900"
                                    }`}
                                >
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                              <p
                                className={`text-xs mt-1 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"
                                  }`}
                              >
                                {notification.description}
                              </p>
                              <p
                                className={`text-xs mt-2 ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"
                                  }`}
                              >
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Theme Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={
                      resolvedTheme === "dark"
                        ? "text-slate-400 hover:text-slate-100"
                        : "text-slate-600 hover:text-slate-900"
                    }
                  >
                    {themeMode === "light" ? (
                      <Sun className="h-5 w-5" />
                    ) : themeMode === "dark" ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Computer className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Tema</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setThemeMode("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Claro</span>
                    {themeMode === "light" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setThemeMode("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Oscuro</span>
                    {themeMode === "dark" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setThemeMode("system")}>
                    <Computer className="mr-2 h-4 w-4" />
                    <span>Sistema</span>
                    {themeMode === "system" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Usuario" />
                <AvatarFallback
                  className={resolvedTheme === "dark" ? "bg-slate-700 text-cyan-500" : "bg-slate-200 text-blue-600"}
                >
                  CM
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content area with independent scrolling regions */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar with independent scroll */}
          <div
            className={`${sidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 overflow-y-auto custom-scrollbar`}
          >
            <div className="p-4">
              <Card
                className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                  } backdrop-blur-sm h-full relative`}
              >
                <CardContent className="p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className={`absolute -right-3 top-3 h-6 w-6 rounded-full ${resolvedTheme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-200 border-slate-300"
                      } border z-10 p-1`}
                  >
                    {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                  <nav className="space-y-2">
                    <NavItem
                      icon={Command}
                      label="Panel Principal"
                      active
                      collapsed={sidebarCollapsed}
                      theme={resolvedTheme}
                    />
                    <NavItem icon={Activity} label="Diagnósticos" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                    <NavItem
                      icon={Database}
                      label="Centro de Datos"
                      collapsed={sidebarCollapsed}
                      theme={resolvedTheme}
                    />
                    <NavItem icon={Globe} label="Red" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                    <NavItem icon={Shield} label="Seguridad" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                    <NavItem icon={Terminal} label="Consola" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                    <NavItem
                      icon={MessageSquare}
                      label="Comunicaciones"
                      collapsed={sidebarCollapsed}
                      theme={resolvedTheme}
                    />
                    <NavItem icon={Settings} label="Configuración" collapsed={sidebarCollapsed} theme={resolvedTheme} />
                  </nav>

                  <div
                    className={`mt-8 pt-6 ${resolvedTheme === "dark" ? "border-t border-slate-700/50" : "border-t border-slate-200/50"
                      } ${sidebarCollapsed ? "hidden" : "block"}`}
                  >
                    <div
                      className={`text-xs ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"
                        } mb-2 font-mono`}
                    >
                      ESTADO DEL SISTEMA
                    </div>
                    <div className="space-y-3">
                      <StatusItem
                        label="Sistemas Principales"
                        value={systemStatus}
                        color="cyan"
                        theme={resolvedTheme}
                      />
                      <StatusItem label="Seguridad" value={securityLevel} color="green" theme={resolvedTheme} />
                      <StatusItem label="Red" value={networkStatus} color="blue" theme={resolvedTheme} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main content with independent scroll */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* System overview */}
              <Card
                className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                  } backdrop-blur-sm overflow-hidden`}
              >
                <CardHeader
                  className={`${resolvedTheme === "dark" ? "border-b border-slate-700/50" : "border-b border-slate-200/50"
                    } pb-3`}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className={`${resolvedTheme === "dark" ? "text-slate-100" : "text-slate-800"} flex items-center`}
                    >
                      <Activity
                        className={`mr-2 h-5 w-5 ${resolvedTheme === "dark" ? "text-cyan-500" : "text-blue-600"}`}
                      />
                      Resumen del Sistema
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={`${resolvedTheme === "dark"
                          ? "bg-slate-800/50 text-cyan-400 border-cyan-500/50"
                          : "bg-slate-100/50 text-blue-600 border-blue-500/50"
                          } text-xs`}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${resolvedTheme === "dark" ? "bg-cyan-500" : "bg-blue-600"
                            } mr-1 animate-pulse`}
                        ></div>
                        EN VIVO
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                      title="Uso de CPU"
                      value={cpuUsage}
                      icon={Cpu}
                      trend="up"
                      color="cyan"
                      detail="3.8 GHz | 12 Núcleos"
                      theme={resolvedTheme}
                    />
                    <MetricCard
                      title="Memoria"
                      value={memoryUsage}
                      icon={HardDrive}
                      trend="stable"
                      color="purple"
                      detail="16.4 GB / 24 GB"
                      theme={resolvedTheme}
                    />
                    <MetricCard
                      title="Red"
                      value={networkStatus}
                      icon={Wifi}
                      trend="down"
                      color="blue"
                      detail="1.2 GB/s | 42ms"
                      theme={resolvedTheme}
                    />
                  </div>

                  <div className="mt-8">
                    <Tabs defaultValue="performance" className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <TabsList className={`${resolvedTheme === "dark" ? "bg-slate-800/50" : "bg-slate-200/50"} p-1`}>
                          <TabsTrigger
                            value="performance"
                            className={`${resolvedTheme === "dark"
                              ? "data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                              : "data-[state=active]:bg-white data-[state=active]:text-blue-600"
                              }`}
                          >
                            Rendimiento
                          </TabsTrigger>
                          <TabsTrigger
                            value="processes"
                            className={`${resolvedTheme === "dark"
                              ? "data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                              : "data-[state=active]:bg-white data-[state=active]:text-blue-600"
                              }`}
                          >
                            Procesos
                          </TabsTrigger>
                          <TabsTrigger
                            value="storage"
                            className={`${resolvedTheme === "dark"
                              ? "data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                              : "data-[state=active]:bg-white data-[state=active]:text-blue-600"
                              }`}
                          >
                            Almacenamiento
                          </TabsTrigger>
                        </TabsList>

                        <div
                          className={`flex items-center space-x-2 text-xs ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"
                            }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full ${resolvedTheme === "dark" ? "bg-cyan-500" : "bg-blue-500"
                                } mr-1`}
                            ></div>
                            CPU
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full ${resolvedTheme === "dark" ? "bg-purple-500" : "bg-purple-500"
                                } mr-1`}
                            ></div>
                            Memoria
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full ${resolvedTheme === "dark" ? "bg-blue-500" : "bg-sky-500"
                                } mr-1`}
                            ></div>
                            Red
                          </div>
                        </div>
                      </div>

                      <TabsContent value="performance" className="mt-0">
                        <div
                          className={`h-64 w-full relative ${resolvedTheme === "dark"
                            ? "bg-slate-800/30 border border-slate-700/50"
                            : "bg-slate-100/30 border border-slate-200/50"
                            } rounded-lg overflow-hidden`}
                        >
                          <PerformanceChart theme={resolvedTheme} />
                          <div
                            className={`absolute bottom-4 right-4 ${resolvedTheme === "dark"
                              ? "bg-slate-900/80 border border-slate-700/50"
                              : "bg-white/80 border border-slate-200/50"
                              } backdrop-blur-sm rounded-md px-3 py-2`}
                          >
                            <div
                              className={`text-xs ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                            >
                              Carga del Sistema
                            </div>
                            <div
                              className={`text-lg font-mono ${resolvedTheme === "dark" ? "text-cyan-400" : "text-blue-600"
                                }`}
                            >
                              {cpuUsage}%
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="processes" className="mt-0">
                        <div
                          className={`${resolvedTheme === "dark"
                            ? "bg-slate-800/30 border border-slate-700/50"
                            : "bg-slate-100/30 border border-slate-200/50"
                            } rounded-lg overflow-hidden`}
                        >
                          <div
                            className={`grid grid-cols-12 text-xs ${resolvedTheme === "dark"
                              ? "text-slate-400 border-b border-slate-700/50 bg-slate-800/50"
                              : "text-slate-500 border-b border-slate-200/50 bg-slate-200/50"
                              } p-3`}
                          >
                            <div className="col-span-1">PID</div>
                            <div className="col-span-4">Proceso</div>
                            <div className="col-span-2">Usuario</div>
                            <div className="col-span-2">CPU</div>
                            <div className="col-span-2">Memoria</div>
                            <div className="col-span-1">Estado</div>
                          </div>

                          <div
                            className={`divide-y ${resolvedTheme === "dark" ? "divide-slate-700/30" : "divide-slate-200/30"
                              }`}
                          >
                            <ProcessRow
                              pid="1024"
                              name="system_core.exe"
                              user="SISTEMA"
                              cpu={12.4}
                              memory={345}
                              status="activo"
                              theme={resolvedTheme}
                            />
                            <ProcessRow
                              pid="1842"
                              name="nexus_service.exe"
                              user="SISTEMA"
                              cpu={8.7}
                              memory={128}
                              status="activo"
                              theme={resolvedTheme}
                            />
                            <ProcessRow
                              pid="2156"
                              name="security_monitor.exe"
                              user="ADMIN"
                              cpu={5.2}
                              memory={96}
                              status="activo"
                              theme={resolvedTheme}
                            />
                            <ProcessRow
                              pid="3012"
                              name="network_manager.exe"
                              user="SISTEMA"
                              cpu={3.8}
                              memory={84}
                              status="activo"
                              theme={resolvedTheme}
                            />
                            <ProcessRow
                              pid="4268"
                              name="user_interface.exe"
                              user="USUARIO"
                              cpu={15.3}
                              memory={256}
                              status="activo"
                              theme={resolvedTheme}
                            />
                            <ProcessRow
                              pid="5124"
                              name="data_analyzer.exe"
                              user="ADMIN"
                              cpu={22.1}
                              memory={512}
                              status="activo"
                              theme={resolvedTheme}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="storage" className="mt-0">
                        <div
                          className={`${resolvedTheme === "dark"
                            ? "bg-slate-800/30 border border-slate-700/50"
                            : "bg-slate-100/30 border border-slate-200/50"
                            } rounded-lg p-4`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <StorageItem
                              name="Unidad Sistema (C:)"
                              total={512}
                              used={324}
                              type="SSD"
                              theme={resolvedTheme}
                            />
                            <StorageItem
                              name="Unidad Datos (D:)"
                              total={2048}
                              used={1285}
                              type="HDD"
                              theme={resolvedTheme}
                            />
                            <StorageItem
                              name="Unidad Respaldo (E:)"
                              total={4096}
                              used={1865}
                              type="HDD"
                              theme={resolvedTheme}
                            />
                            <StorageItem
                              name="Unidad Externa (F:)"
                              total={1024}
                              used={210}
                              type="SSD"
                              theme={resolvedTheme}
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              {/* Security & Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                    } backdrop-blur-sm`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle
                      className={`${resolvedTheme === "dark" ? "text-slate-100" : "text-slate-800"
                        } flex items-center text-base`}
                    >
                      <Shield
                        className={`mr-2 h-5 w-5 ${resolvedTheme === "dark" ? "text-green-500" : "text-green-600"}`}
                      />
                      Estado de Seguridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Firewall
                        </div>
                        <Badge
                          className={`${resolvedTheme === "dark"
                            ? "bg-green-500/20 text-green-400 border-green-500/50"
                            : "bg-green-100 text-green-600 border-green-200"
                            }`}
                        >
                          Activo
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Detección de Intrusiones
                        </div>
                        <Badge
                          className={`${resolvedTheme === "dark"
                            ? "bg-green-500/20 text-green-400 border-green-500/50"
                            : "bg-green-100 text-green-600 border-green-200"
                            }`}
                        >
                          Activo
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Encriptación
                        </div>
                        <Badge
                          className={`${resolvedTheme === "dark"
                            ? "bg-green-500/20 text-green-400 border-green-500/50"
                            : "bg-green-100 text-green-600 border-green-200"
                            }`}
                        >
                          Activo
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Base de Datos de Amenazas
                        </div>
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-cyan-400" : "text-blue-600"}`}>
                          Actualizada{" "}
                          <span className={resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"}>
                            hace 12 min
                          </span>
                        </div>
                      </div>

                      <div
                        className={`pt-2 mt-2 ${resolvedTheme === "dark" ? "border-t border-slate-700/50" : "border-t border-slate-200/50"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className={`text-sm font-medium ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-700"
                              }`}
                          >
                            Nivel de Seguridad
                          </div>
                          <div className={`text-sm ${resolvedTheme === "dark" ? "text-cyan-400" : "text-blue-600"}`}>
                            {securityLevel}%
                          </div>
                        </div>
                        <Progress
                          value={securityLevel}
                          className={`h-2 ${resolvedTheme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}
                        >
                          <div
                            className={`h-full ${resolvedTheme === "dark"
                              ? "bg-gradient-to-r from-green-500 to-cyan-500"
                              : "bg-gradient-to-r from-green-500 to-blue-500"
                              } rounded-full`}
                            style={{ width: `${securityLevel}%` }}
                          />
                        </Progress>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                    } backdrop-blur-sm`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle
                      className={`${resolvedTheme === "dark" ? "text-slate-100" : "text-slate-800"
                        } flex items-center text-base`}
                    >
                      <AlertCircle
                        className={`mr-2 h-5 w-5 ${resolvedTheme === "dark" ? "text-amber-500" : "text-amber-600"}`}
                      />
                      Alertas del Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <AlertItem
                        title="Escaneo de Seguridad Completado"
                        time="14:32:12"
                        description="No se detectaron amenazas en el escaneo del sistema"
                        type="info"
                        theme={resolvedTheme}
                      />
                      <AlertItem
                        title="Pico de Ancho de Banda Detectado"
                        time="13:45:06"
                        description="Actividad de red inusual en el puerto 443"
                        type="warning"
                        theme={resolvedTheme}
                      />
                      <AlertItem
                        title="Actualización del Sistema Disponible"
                        time="09:12:45"
                        description="Versión 12.4.5 lista para instalar"
                        type="update"
                        theme={resolvedTheme}
                      />
                      <AlertItem
                        title="Copia de Seguridad Completada"
                        time="04:30:00"
                        description="Copia de seguridad incremental a la unidad E: exitosa"
                        type="success"
                        theme={resolvedTheme}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Communications */}
              <Card
                className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                  } backdrop-blur-sm`}
              >
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle
                    className={`${resolvedTheme === "dark" ? "text-slate-100" : "text-slate-800"
                      } flex items-center text-base`}
                  >
                    <MessageSquare
                      className={`mr-2 h-5 w-5 ${resolvedTheme === "dark" ? "text-blue-500" : "text-blue-600"}`}
                    />
                    Registro de Comunicaciones
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`${resolvedTheme === "dark"
                      ? "bg-slate-800/50 text-blue-400 border-blue-500/50"
                      : "bg-blue-50 text-blue-600 border-blue-200"
                      }`}
                  >
                    4 Mensajes Nuevos
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <CommunicationItem
                      sender="Administrador del Sistema"
                      time="15:42:12"
                      message="El mantenimiento programado ocurrirá a las 02:00. Todos los sistemas estarán temporalmente fuera de línea."
                      avatar="/placeholder.svg?height=40&width=40"
                      unread
                      theme={resolvedTheme}
                    />
                    <CommunicationItem
                      sender="Módulo de Seguridad"
                      time="14:30:45"
                      message="Intento de inicio de sesión inusual bloqueado desde IP 192.168.1.45. Añadido a la lista de vigilancia."
                      avatar="/placeholder.svg?height=40&width=40"
                      unread
                      theme={resolvedTheme}
                    />
                    <CommunicationItem
                      sender="Control de Red"
                      time="12:15:33"
                      message="Asignación de ancho de banda ajustada para servicios prioritarios durante horas pico."
                      avatar="/placeholder.svg?height=40&width=40"
                      unread
                      theme={resolvedTheme}
                    />
                    <CommunicationItem
                      sender="Centro de Datos"
                      time="09:05:18"
                      message="Verificación de copia de seguridad completa. Todas las comprobaciones de integridad de datos aprobadas."
                      avatar="/placeholder.svg?height=40&width=40"
                      unread
                      theme={resolvedTheme}
                    />
                  </div>
                </CardContent>
                <CardFooter
                  className={`${resolvedTheme === "dark" ? "border-t border-slate-700/50" : "border-t border-slate-200/50"
                    } pt-4`}
                >
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="text"
                      placeholder="Escribe un mensaje..."
                      className={`flex-1 ${resolvedTheme === "dark"
                        ? "bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-500"
                        : "bg-slate-100/50 border-slate-200/50 text-slate-700 placeholder:text-slate-400"
                        } border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 ${resolvedTheme === "dark" ? "focus:ring-cyan-500" : "focus:ring-blue-500"
                        }`}
                    />
                    <Button
                      size="icon"
                      className={
                        resolvedTheme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                      }
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className={
                        resolvedTheme === "dark" ? "bg-cyan-600 hover:bg-cyan-700" : "bg-blue-600 hover:bg-blue-700"
                      }
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Right sidebar with independent scroll */}
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
                        {formatTime(currentTime)}
                      </div>
                      <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        {formatDate(currentTime)}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className={`${resolvedTheme === "dark"
                          ? "bg-slate-800/50 border border-slate-700/50"
                          : "bg-slate-100/50 border border-slate-200/50"
                          } rounded-md p-3`}
                      >
                        <div
                          className={`text-xs ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"} mb-1`}
                        >
                          Tiempo Activo
                        </div>
                        <div
                          className={`text-sm font-mono ${resolvedTheme === "dark" ? "text-slate-200" : "text-slate-700"
                            }`}
                        >
                          14d 06:42:18
                        </div>
                      </div>
                      <div
                        className={`${resolvedTheme === "dark"
                          ? "bg-slate-800/50 border border-slate-700/50"
                          : "bg-slate-100/50 border border-slate-200/50"
                          } rounded-md p-3`}
                      >
                        <div
                          className={`text-xs ${resolvedTheme === "dark" ? "text-slate-500" : "text-slate-400"} mb-1`}
                        >
                          Zona Horaria
                        </div>
                        <div
                          className={`text-sm font-mono ${resolvedTheme === "dark" ? "text-slate-200" : "text-slate-700"
                            }`}
                        >
                          UTC-08:00
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card
                className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                  } backdrop-blur-sm`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className={`${resolvedTheme === "dark" ? "text-slate-100" : "text-slate-800"} text-base`}>
                    Acciones Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={Shield} label="Escaneo de Seguridad" theme={resolvedTheme} />
                    <ActionButton icon={RefreshCw} label="Sincronizar Datos" theme={resolvedTheme} />
                    <ActionButton icon={Download} label="Copia de Seguridad" theme={resolvedTheme} />
                    <ActionButton icon={Terminal} label="Consola" theme={resolvedTheme} />
                  </div>
                </CardContent>
              </Card>

              {/* Resource allocation */}
              <Card
                className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                  } backdrop-blur-sm`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className={`${resolvedTheme === "dark" ? "text-slate-100" : "text-slate-800"} text-base`}>
                    Asignación de Recursos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Potencia de Procesamiento
                        </div>
                        <div className={`text-xs ${resolvedTheme === "dark" ? "text-cyan-400" : "text-blue-600"}`}>
                          42% asignado
                        </div>
                      </div>
                      <div
                        className={`h-2 ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-200"
                          } rounded-full overflow-hidden`}
                      >
                        <div
                          className={`h-full ${resolvedTheme === "dark"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                            : "bg-gradient-to-r from-blue-500 to-indigo-500"
                            } rounded-full`}
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Asignación de Memoria
                        </div>
                        <div className={`text-xs ${resolvedTheme === "dark" ? "text-purple-400" : "text-purple-600"}`}>
                          68% asignado
                        </div>
                      </div>
                      <div
                        className={`h-2 ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-200"
                          } rounded-full overflow-hidden`}
                      >
                        <div
                          className={`h-full ${resolvedTheme === "dark"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500"
                            : "bg-gradient-to-r from-purple-500 to-fuchsia-500"
                            } rounded-full`}
                          style={{ width: "68%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Ancho de Banda de Red
                        </div>
                        <div className={`text-xs ${resolvedTheme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                          35% asignado
                        </div>
                      </div>
                      <div
                        className={`h-2 ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-slate-200"
                          } rounded-full overflow-hidden`}
                      >
                        <div
                          className={`h-full ${resolvedTheme === "dark"
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                            : "bg-gradient-to-r from-sky-500 to-blue-500"
                            } rounded-full`}
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>

                    <div
                      className={`pt-2 ${resolvedTheme === "dark" ? "border-t border-slate-700/50" : "border-t border-slate-200/50"
                        }`}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <div className={resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}>
                          Nivel de Prioridad
                        </div>
                        <div className="flex items-center">
                          <Slider defaultValue={[3]} max={5} step={1} className="w-24 mr-2" />
                          <span className={resolvedTheme === "dark" ? "text-cyan-400" : "text-blue-600"}>3/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environment controls */}
              <Card
                className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                  } backdrop-blur-sm`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className={`${resolvedTheme === "dark" ? "text-slate-100" : "text-slate-800"} text-base`}>
                    Controles del Entorno
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Radio
                          className={`${resolvedTheme === "dark" ? "text-cyan-500" : "text-blue-600"} mr-2 h-4 w-4`}
                        />
                        <Label className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Gestión de Energía
                        </Label>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock
                          className={`${resolvedTheme === "dark" ? "text-cyan-500" : "text-blue-600"} mr-2 h-4 w-4`}
                        />
                        <Label className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Protocolo de Seguridad
                        </Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap
                          className={`${resolvedTheme === "dark" ? "text-cyan-500" : "text-blue-600"} mr-2 h-4 w-4`}
                        />
                        <Label className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Modo Ahorro de Energía
                        </Label>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CircleOff
                          className={`${resolvedTheme === "dark" ? "text-cyan-500" : "text-blue-600"} mr-2 h-4 w-4`}
                        />
                        <Label className={`text-sm ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Apagado Automático
                        </Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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

// Component for status items
function StatusItem({
  label,
  value,
  color = "cyan",
  theme,
}: {
  label: string
  value: number
  color?: string
  theme: "dark" | "light"
}) {
  const getColor = () => {
    if (theme === "dark") {
      switch (color) {
        case "cyan":
          return "from-cyan-500 to-blue-500"
        case "green":
          return "from-green-500 to-emerald-500"
        case "blue":
          return "from-blue-500 to-indigo-500"
        case "purple":
          return "from-purple-500 to-pink-500"
        default:
          return "from-cyan-500 to-blue-500"
      }
    } else {
      switch (color) {
        case "cyan":
          return "from-blue-500 to-sky-500"
        case "green":
          return "from-green-500 to-emerald-500"
        case "blue":
          return "from-blue-500 to-indigo-500"
        case "purple":
          return "from-purple-500 to-fuchsia-500"
        default:
          return "from-blue-500 to-sky-500"
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{label}</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{value}%</div>
      </div>
      <div className={`h-1.5 ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"} rounded-full overflow-hidden`}>
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  theme,
}: {
  title: string
  value: number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  theme: "dark" | "light"
}) {
  const getColor = () => {
    if (theme === "dark") {
      switch (color) {
        case "cyan":
          return "from-cyan-500 to-blue-500 border-cyan-500/30"
        case "green":
          return "from-green-500 to-emerald-500 border-green-500/30"
        case "blue":
          return "from-blue-500 to-indigo-500 border-blue-500/30"
        case "purple":
          return "from-purple-500 to-pink-500 border-purple-500/30"
        default:
          return "from-cyan-500 to-blue-500 border-cyan-500/30"
      }
    } else {
      switch (color) {
        case "cyan":
          return "from-blue-500 to-sky-500 border-blue-500/30"
        case "green":
          return "from-green-500 to-emerald-500 border-green-500/30"
        case "blue":
          return "from-blue-500 to-indigo-500 border-blue-500/30"
        case "purple":
          return "from-purple-500 to-fuchsia-500 border-purple-500/30"
        default:
          return "from-blue-500 to-sky-500 border-blue-500/30"
      }
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className={`h-4 w-4 ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`} />
      case "down":
        return <BarChart3 className={`h-4 w-4 rotate-180 ${theme === "dark" ? "text-green-500" : "text-green-600"}`} />
      case "stable":
        return <LineChart className={`h-4 w-4 ${theme === "dark" ? "text-blue-500" : "text-blue-600"}`} />
      default:
        return null
    }
  }

  return (
    <div
      className={`${theme === "dark" ? "bg-slate-800/50 border" : "bg-slate-100/50 border"
        } ${getColor()} rounded-lg p-4 relative overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{title}</div>
        <Icon
          className={`h-5 w-5 ${theme === "dark"
            ? color === "cyan"
              ? "text-cyan-500"
              : color === "purple"
                ? "text-purple-500"
                : "text-blue-500"
            : color === "cyan"
              ? "text-blue-600"
              : color === "purple"
                ? "text-purple-600"
                : "text-blue-600"
            }`}
        />
      </div>
      <div
        className={`text-2xl font-bold mb-1 ${theme === "dark"
          ? "bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300"
          : "bg-gradient-to-r bg-clip-text text-transparent from-slate-800 to-slate-600"
          }`}
      >
        {value}%
      </div>
      <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div
        className={`absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl ${theme === "dark" ? "from-cyan-500 to-blue-500" : "from-blue-500 to-sky-500"
          }`}
      ></div>
    </div>
  )
}

// Performance chart component
function PerformanceChart({ theme }: { theme: "dark" | "light" }) {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>100%</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>75%</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>50%</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>25%</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>0%</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className={`border-b ${theme === "dark" ? "border-slate-700/30" : "border-slate-300/30"} w-full`}></div>
        <div className={`border-b ${theme === "dark" ? "border-slate-700/30" : "border-slate-300/30"} w-full`}></div>
        <div className={`border-b ${theme === "dark" ? "border-slate-700/30" : "border-slate-300/30"} w-full`}></div>
        <div className={`border-b ${theme === "dark" ? "border-slate-700/30" : "border-slate-300/30"} w-full`}></div>
        <div className={`border-b ${theme === "dark" ? "border-slate-700/30" : "border-slate-300/30"} w-full`}></div>
      </div>

      {/* Chart bars */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 24 }).map((_, i) => {
          const cpuHeight = Math.floor(Math.random() * 60) + 20
          const memHeight = Math.floor(Math.random() * 40) + 40
          const netHeight = Math.floor(Math.random() * 30) + 30

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className={`w-1 bg-gradient-to-t ${theme === "dark" ? "from-cyan-500 to-cyan-400" : "from-blue-500 to-blue-400"
                  } rounded-t-sm`}
                style={{ height: `${cpuHeight}%` }}
              ></div>
              <div
                className={`w-1 bg-gradient-to-t ${theme === "dark" ? "from-purple-500 to-purple-400" : "from-purple-500 to-purple-400"
                  } rounded-t-sm`}
                style={{ height: `${memHeight}%` }}
              ></div>
              <div
                className={`w-1 bg-gradient-to-t ${theme === "dark" ? "from-blue-500 to-blue-400" : "from-sky-500 to-sky-400"
                  } rounded-t-sm`}
                style={{ height: `${netHeight}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>00:00</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>06:00</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>12:00</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>18:00</div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>24:00</div>
      </div>
    </div>
  )
}

// Process row component
function ProcessRow({
  pid,
  name,
  user,
  cpu,
  memory,
  status,
  theme,
}: {
  pid: string
  name: string
  user: string
  cpu: number
  memory: number
  status: string
  theme: "dark" | "light"
}) {
  return (
    <div
      className={`grid grid-cols-12 py-2 px-3 text-sm ${theme === "dark" ? "hover:bg-slate-800/50" : "hover:bg-slate-200/50"
        }`}
    >
      <div className={theme === "dark" ? "col-span-1 text-slate-500" : "col-span-1 text-slate-400"}>{pid}</div>
      <div className={theme === "dark" ? "col-span-4 text-slate-300" : "col-span-4 text-slate-700"}>{name}</div>
      <div className={theme === "dark" ? "col-span-2 text-slate-400" : "col-span-2 text-slate-500"}>{user}</div>
      <div className={theme === "dark" ? "col-span-2 text-cyan-400" : "col-span-2 text-blue-600"}>{cpu}%</div>
      <div className={theme === "dark" ? "col-span-2 text-purple-400" : "col-span-2 text-purple-600"}>{memory} MB</div>
      <div className="col-span-1">
        <Badge
          variant="outline"
          className={`${theme === "dark"
            ? "bg-green-500/10 text-green-400 border-green-500/30"
            : "bg-green-100 text-green-600 border-green-200"
            } text-xs`}
        >
          {status}
        </Badge>
      </div>
    </div>
  )
}

// Storage item component
function StorageItem({
  name,
  total,
  used,
  type,
  theme,
}: {
  name: string
  total: number
  used: number
  type: string
  theme: "dark" | "light"
}) {
  const percentage = Math.round((used / total) * 100)

  return (
    <div
      className={`${theme === "dark" ? "bg-slate-800/50 border border-slate-700/50" : "bg-slate-100/50 border border-slate-200/50"
        } rounded-md p-3`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={theme === "dark" ? "text-sm text-slate-300" : "text-sm text-slate-700"}>{name}</div>
        <Badge
          variant="outline"
          className={`${theme === "dark"
            ? "bg-slate-700/50 text-slate-300 border-slate-600/50"
            : "bg-slate-200/50 text-slate-700 border-slate-300/50"
            } text-xs`}
        >
          {type}
        </Badge>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <div className={theme === "dark" ? "text-xs text-slate-500" : "text-xs text-slate-400"}>
            {used} GB / {total} GB
          </div>
          <div className={theme === "dark" ? "text-xs text-slate-400" : "text-xs text-slate-500"}>{percentage}%</div>
        </div>
        <Progress value={percentage} className={`h-1.5 ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}>
          <div
            className={`h-full rounded-full ${percentage > 90
              ? theme === "dark"
                ? "bg-red-500"
                : "bg-red-500"
              : percentage > 70
                ? theme === "dark"
                  ? "bg-amber-500"
                  : "bg-amber-500"
                : theme === "dark"
                  ? "bg-cyan-500"
                  : "bg-blue-500"
              }`}
            style={{ width: `${percentage}%` }}
          />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className={theme === "dark" ? "text-slate-500" : "text-slate-400"}>Libre: {total - used} GB</div>
        <Button
          variant="ghost"
          size="sm"
          className={`h-6 text-xs px-2 ${theme === "dark" ? "text-slate-400 hover:text-slate-100" : "text-slate-500 hover:text-slate-900"
            }`}
        >
          Detalles
        </Button>
      </div>
    </div>
  )
}

// Alert item component
function AlertItem({
  title,
  time,
  description,
  type,
  theme,
}: {
  title: string
  time: string
  description: string
  type: "info" | "warning" | "error" | "success" | "update"
  theme: "dark" | "light"
}) {
  const getTypeStyles = () => {
    if (theme === "dark") {
      switch (type) {
        case "info":
          return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
        case "warning":
          return { icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
        case "error":
          return { icon: AlertCircle, color: "text-red-500 bg-red-500/10 border-red-500/30" }
        case "success":
          return { icon: CheckIcon, color: "text-green-500 bg-green-500/10 border-green-500/30" }
        case "update":
          return { icon: Download, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30" }
        default:
          return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      }
    } else {
      switch (type) {
        case "info":
          return { icon: Info, color: "text-blue-600 bg-blue-100 border-blue-200" }
        case "warning":
          return { icon: AlertCircle, color: "text-amber-600 bg-amber-100 border-amber-200" }
        case "error":
          return { icon: AlertCircle, color: "text-red-600 bg-red-100 border-red-200" }
        case "success":
          return { icon: CheckIcon, color: "text-green-600 bg-green-100 border-green-200" }
        case "update":
          return { icon: Download, color: "text-blue-600 bg-blue-100 border-blue-200" }
        default:
          return { icon: Info, color: "text-blue-600 bg-blue-100 border-blue-200" }
      }
    }
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div
            className={theme === "dark" ? "text-sm font-medium text-slate-200" : "text-sm font-medium text-slate-700"}
          >
            {title}
          </div>
          <div className={theme === "dark" ? "ml-2 text-xs text-slate-500" : "ml-2 text-xs text-slate-400"}>{time}</div>
        </div>
        <div className={theme === "dark" ? "text-xs text-slate-400" : "text-xs text-slate-500"}>{description}</div>
      </div>
    </div>
  )
}

// Communication item component
function CommunicationItem({
  sender,
  time,
  message,
  avatar,
  unread,
  theme,
}: {
  sender: string
  time: string
  message: string
  avatar: string
  unread?: boolean
  theme: "dark" | "light"
}) {
  return (
    <div
      className={`flex space-x-3 p-2 rounded-md ${unread
        ? theme === "dark"
          ? "bg-slate-800/50 border border-slate-700/50"
          : "bg-slate-100/50 border border-slate-200/50"
        : ""
        }`}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt={sender} />
        <AvatarFallback className={theme === "dark" ? "bg-slate-700 text-cyan-500" : "bg-slate-200 text-blue-600"}>
          {sender.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div
            className={theme === "dark" ? "text-sm font-medium text-slate-200" : "text-sm font-medium text-slate-700"}
          >
            {sender}
          </div>
          <div className={theme === "dark" ? "text-xs text-slate-500" : "text-xs text-slate-400"}>{time}</div>
        </div>
        <div className={theme === "dark" ? "text-xs text-slate-400 mt-1" : "text-xs text-slate-500 mt-1"}>
          {message}
        </div>
      </div>
      {unread && (
        <div className="flex-shrink-0 self-center">
          <div className={`h-2 w-2 rounded-full ${theme === "dark" ? "bg-cyan-500" : "bg-blue-600"}`}></div>
        </div>
      )}
    </div>
  )
}

// Action button component
function ActionButton({ icon: Icon, label, theme }: { icon: LucideIcon; label: string; theme: "dark" | "light" }) {
  return (
    <Button
      variant="outline"
      className={`h-auto py-3 px-3 ${theme === "dark"
        ? "border-slate-700 bg-slate-800/50 hover:bg-slate-700/50"
        : "border-slate-200 bg-slate-100/50 hover:bg-slate-200/50"
        } flex flex-col items-center justify-center space-y-1 w-full`}
    >
      <Icon className={`h-5 w-5 ${theme === "dark" ? "text-cyan-500" : "text-blue-600"}`} />
      <span className="text-xs">{label}</span>
    </Button>
  )
}

// Helper functions for notifications
function getNotificationTypeIcon(type: string, theme: "dark" | "light") {
  switch (type) {
    case "info":
      return <Info className={`h-4 w-4 ${theme === "dark" ? "text-blue-500" : "text-blue-600"}`} />
    case "warning":
      return <AlertCircle className={`h-4 w-4 ${theme === "dark" ? "text-amber-500" : "text-amber-600"}`} />
    case "success":
      return <CheckIcon className={`h-4 w-4 ${theme === "dark" ? "text-green-500" : "text-green-600"}`} />
    case "update":
      return <Download className={`h-4 w-4 ${theme === "dark" ? "text-cyan-500" : "text-blue-600"}`} />
    default:
      return <Info className={`h-4 w-4 ${theme === "dark" ? "text-blue-500" : "text-blue-600"}`} />
  }
}

function getNotificationTypeStyles(type: string, theme: "dark" | "light") {
  if (theme === "dark") {
    switch (type) {
      case "info":
        return { bg: "bg-blue-500/20" }
      case "warning":
        return { bg: "bg-amber-500/20" }
      case "success":
        return { bg: "bg-green-500/20" }
      case "update":
        return { bg: "bg-cyan-500/20" }
      default:
        return { bg: "bg-blue-500/20" }
    }
  } else {
    switch (type) {
      case "info":
        return { bg: "bg-blue-100" }
      case "warning":
        return { bg: "bg-amber-100" }
      case "success":
        return { bg: "bg-green-100" }
      case "update":
        return { bg: "bg-blue-100" }
      default:
        return { bg: "bg-blue-100" }
    }
  }
}

// Add missing imports
function Info(props) {
  return <AlertCircle {...props} />
}

function CheckIcon(props) {
  return <Shield {...props} />
}
