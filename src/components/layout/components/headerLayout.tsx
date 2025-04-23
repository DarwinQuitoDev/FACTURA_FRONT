import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Check, Computer, Hexagon, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "@/contexts/appProvider";
import { useAuth } from "@/contexts/authProvider";

const Header = () => {
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className={`flex items-center justify-between py-4 px-6 border-b ${resolvedTheme === "dark" ? "border-slate-700/50 bg-black/50" : "border-slate-200 bg-white/50"} backdrop-blur-sm z-20 sticky top-0`}>
      <div className="flex items-center space-x-2">
        <Hexagon className={`h-8 w-8 ${resolvedTheme === "dark" ? "text-cyan-500" : "text-blue-600"}`} />
        <span className={`text-xl font-bold bg-gradient-to-r ${resolvedTheme === "dark" ? "from-cyan-400 to-blue-500" : "from-blue-600 to-indigo-600"} bg-clip-text text-transparent`}>
          SISTEMA DE FACTURACION
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
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

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.nombre_usuario || "Usuario"} />
                <AvatarFallback className={resolvedTheme === "dark" ? "bg-slate-700 text-cyan-500" : "bg-slate-200 text-blue-600"}>
                  {user?.nombre_usuario?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{user?.nombre_usuario || "Usuario"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;