import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Activity, AlertCircle, Bell, Check, CheckIcon, Computer, Download, Hexagon, Info, Moon, Search, Shield, Sun, Terminal, User, Wifi, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeProvider";

const Header = () => {

  const { themeMode, setThemeMode, resolvedTheme } = useTheme()

  // Search states
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)



  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  
  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
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

    // Get unread notification count
    const unreadCount = notifications.filter((n) => !n.read).length

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

  return (
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
  )
}

export default Header;