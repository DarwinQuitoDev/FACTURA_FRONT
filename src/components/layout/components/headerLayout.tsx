import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@radix-ui/react-avatar";
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
          SISTEMA DE FACTURACION
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Selector */}
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
            className={`w-40 p-0 ${
              resolvedTheme === "dark"
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            } custom-scrollbar`}
          >
            <Card
              className={`${
                resolvedTheme === "dark"
                  ? "bg-slate-900/50 border-slate-700/50"
                  : "bg-white/50 border-slate-200/50"
              } backdrop-blur-sm h-full`}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h3
                  className={`font-medium ${
                    resolvedTheme === "dark"
                      ? "text-slate-200"
                      : "text-slate-900"
                  }`}
                >
                  Tema
                </h3>
              </div>

              <div className="divide-y divide-slate-200 dark:divide-slate-700">
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
                    className={`w-full flex items-center px-4 py-3 space-x-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      resolvedTheme === "dark"
                        ? "text-slate-300"
                        : "text-slate-800"
                    }`}
                  >
                    <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                      {icon}
                    </div>
                    <span className="flex-1">{label}</span>
                    {themeMode === mode && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </PopoverContent>
        </Popover>

        {/* User Menu with Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt={user?.nombre_usuario || "Usuario"}
                />
                <AvatarFallback
                  className={
                    resolvedTheme === "dark"
                      ? "bg-slate-700 text-cyan-500"
                      : "bg-slate-200 text-blue-600"
                  }
                >
                  {user?.nombre_usuario?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className={`w-48 p-0 ${
              resolvedTheme === "dark"
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <Card
              className={`${
                resolvedTheme === "dark"
                  ? "bg-slate-900/50 border-slate-700/50"
                  : "bg-white/50 border-slate-200/50"
              } backdrop-blur-sm h-full`}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h3
                  className={`font-medium ${
                    resolvedTheme === "dark"
                      ? "text-slate-200"
                      : "text-slate-900"
                  }`}
                >
                  Mi Cuenta
                </h3>
              </div>

              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                <div className="flex items-center px-4 py-3 space-x-3">
                  <User className="h-4 w-4" />
                  <span className="text-sm">
                    {user?.nombre_usuario || "Usuario"}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className={`w-full flex items-center px-4 py-3 space-x-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    resolvedTheme === "dark"
                      ? "text-slate-300"
                      : "text-slate-800"
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
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
