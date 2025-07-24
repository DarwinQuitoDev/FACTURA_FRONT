import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { login } from "../services/LoginService"
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
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await login(username, password);
      console.log("Login response:", response);
      if (remember) {
        localStorage.setItem("rememberUsuario", username);
      } else {
        localStorage.removeItem("rememberUsuario");
      }
      // Guardar token y usuario en localStorage
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.usuario));
      // Guardar en contexto
      auth.login(response.usuario, response.token);
      // Callback: pasar usuario y token para que LoginPage lo use correctamente
      onLoginSuccess({ user: response.usuario, accessToken: response.token });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
      <div className="space-y-1">
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
