import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { AlertCircle, Bell, Check, CheckIcon, Computer, Download, Hexagon, Info, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/appProvider";
import { Card } from "@/components/ui/card";

const Header = () => {

  const { themeMode, setThemeMode, resolvedTheme } = useTheme()


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
              <Card
                className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"
                  } backdrop-blur-sm h-full relative`}
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
              </Card>
            </PopoverContent>
          </Popover>

          {/* Theme Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`relative ${resolvedTheme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"}`}
              >
                {themeMode === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : themeMode === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Computer className="h-5 w-5" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className={`w-40 p-0 ${resolvedTheme === "dark" ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"} custom-scrollbar`}
            >
              <Card className={`${resolvedTheme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/50 border-slate-200/50"} backdrop-blur-sm h-full`}>
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className={`font-medium ${resolvedTheme === "dark" ? "text-slate-200" : "text-slate-900"}`}>
                    Tema
                  </h3>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {[
                    {
                      mode: "light",
                      label: "Claro",
                      icon: <Sun className="h-4 w-4 text-yellow-500" />
                    },
                    {
                      mode: "dark",
                      label: "Oscuro",
                      icon: <Moon className="h-4 w-4 text-purple-400" />
                    },
                    {
                      mode: "system",
                      label: "Sistema",
                      icon: <Computer className="h-4 w-4 text-blue-500" />
                    }
                  ].map(({ mode, label, icon }) => (
                    <button
                      key={mode}
                      onClick={() => setThemeMode(mode as "light" | "dark" | "system")}
                      className={`w-full flex items-center px-4 py-3 space-x-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800
                      ${resolvedTheme === "dark" ? "text-slate-300" : "text-slate-800"}`}
                    >
                      <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                        {icon}
                      </div>
                      <span className="flex-1">{label}</span>
                      {themeMode === mode && <Check className="h-4 w-4 text-green-500" />}
                    </button>
                  ))}
                </div>
              </Card>
            </PopoverContent>
          </Popover>

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