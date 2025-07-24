import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import {
  Check,
  Computer,
  Hexagon,
  LogOut,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "@/contexts/appProvider";
import { useAuth } from "@/contexts/authProvider";

const Header = () => {
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header
      className={`flex items-center justify-between py-4 px-6 border-b ${
        resolvedTheme === "dark"
          ? "border-slate-700/50 bg-black/50"
          : "border-slate-200 bg-white/50"
      } backdrop-blur-sm z-20 sticky top-0`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Hexagon
          className={`h-8 w-8 ${
            resolvedTheme === "dark" ? "text-cyan-500" : "text-blue-600"
          }`}
        />
        <span
          className={`text-xl font-bold bg-gradient-to-r ${
            resolvedTheme === "dark"
              ? "from-cyan-400 to-blue-500"
              : "from-blue-600 to-indigo-600"
          } bg-clip-text text-transparent`}
        >
          APP CHUCHUQUI
        </span>
      </div>

      {/* Botones lado derecho */}
      <div className="flex items-center space-x-4">
        {/* Popover de Tema */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`relative ${
                resolvedTheme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
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
            className={`w-44 p-0 rounded-xl border shadow-md ${
              resolvedTheme === "dark"
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <Card className="backdrop-blur-sm">
              <div className="p-4 border-b dark:border-slate-700">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Tema visual
                </h3>
              </div>
              <div className="divide-y dark:divide-slate-700">
                {[
                  {
                    mode: "light",
                    label: "Claro",
                    icon: <Sun className="h-4 w-4 text-yellow-500" />,
                  },
                  {
                    mode: "dark",
                    label: "Oscuro",
                    icon: <Moon className="h-4 w-4 text-purple-400" />,
                  },
                  {
                    mode: "system",
                    label: "Sistema",
                    icon: <Computer className="h-4 w-4 text-blue-500" />,
                  },
                ].map(({ mode, label, icon }) => (
                  <button
                    key={mode}
                    onClick={() =>
                      setThemeMode(mode as "light" | "dark" | "system")
                    }
                    className={`w-full flex items-center px-4 py-3 space-x-3 text-left hover:bg-muted ${
                      resolvedTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-800"
                    }`}
                  >
                    <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                      {icon}
                    </div>
                    <span className="flex-1 text-sm">{label}</span>
                    {themeMode === mode && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </PopoverContent>
        </Popover>

        {/* Popover de Usuario */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full shadow-md">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt={user?.nombre || "Usuario"}
                />
                <AvatarFallback className="bg-muted font-bold">
                  {user?.nombre?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className={`w-56 p-0 rounded-xl border shadow-md ${
              resolvedTheme === "dark"
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <Card className="backdrop-blur-sm">
              <div className="p-4 border-b dark:border-slate-700">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  Sesión iniciada como:
                </h3>
                <div className="text-base font-medium text-primary truncate">
                  {user?.nombre || "Usuario"}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {user?.correo || "sin-correo@ejemplo.com"}
                </div>
              </div>

              <div className="divide-y dark:divide-slate-700">
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-3 gap-3 text-left text-sm hover:bg-muted transition-colors"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  <span className="text-red-600">Cerrar sesión</span>
                </button>
              </div>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
