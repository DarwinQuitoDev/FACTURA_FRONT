import { useTheme } from "@/contexts/appProvider"
import { useAuth } from "@/contexts/authProvider"
import LoginForm from "../components/LoginForm"
import { ParticlesBackground } from "@/components/background/particlesBackground"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Warehouse } from "lucide-react"
import CardWhatsapp from "../components/CardWhatsapp"
import { useNavigate, useLocation } from 'react-router-dom'

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = (response: any) => {
    login(response.user, response.accessToken, response.refreshToken);
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  }

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className={`${resolvedTheme} min-h-screen ${isDark
      ? "bg-gradient-to-br from-black to-slate-900 text-slate-100"
      : "bg-gradient-to-br from-slate-100 to-white text-slate-800"} relative overflow-hidden`}> 

      <ParticlesBackground
        theme={isDark ? "dark" : "light"}
        className="z-0"
        particleCount={500}
        opacity={0.3}
      />

      <div className="flex-1 overflow-y-auto px-6 py-10 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className={`${isDark ? "bg-slate-900/60 border-slate-700/50" : "bg-white/70 border-slate-200/50"} backdrop-blur-md shadow-xl rounded-2xl overflow-hidden`}>
            <CardHeader className={`pb-3 ${isDark ? "border-b border-slate-700/50" : "border-b border-slate-200/50"}`}>
              <div className="flex items-center justify-center">
                <CardTitle className={`flex items-center gap-2 text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                  <Warehouse className={`h-6 w-6 ${isDark ? "text-cyan-400" : "text-blue-600"}`} />
                  Iniciar Sesión
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </CardContent>
          </Card>
          <CardWhatsapp />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
