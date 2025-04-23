import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { login } from "../services/loginService"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/authProvider"

interface LoginResponse {
  user: {
    id: number;
    nombre_usuario: string;
    correo: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface LoginFormProps {
  onLoginSuccess: (response: LoginResponse) => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [usuario, setUsuario] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const response = await login(usuario, password)
      if (remember) {
        localStorage.setItem("rememberUsuario", usuario)
      } else {
        localStorage.removeItem("rememberUsuario")
      }
      
      // Save auth data using context
      auth.login(response.user, response.accessToken, response.refreshToken)
      
      // Trigger onLoginSuccess callback
      onLoginSuccess(response)
      
      // Navigate to the page user tried to visit or home
      navigate(from, { replace: true })
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
      <div className="space-y-1">
        <Label htmlFor="usuario">Usuario</Label>
        <Input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2">
          <Checkbox id="remember" checked={remember} onCheckedChange={() => setRemember(!remember)} />
          <span>Recordar usuario</span>
        </label>
        <Link to="/recuperar-clave" className="text-blue-600 hover:underline dark:text-cyan-400">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Cargando..." : "Iniciar sesión"}
      </Button>
    </form>
  )
}

export default LoginForm
