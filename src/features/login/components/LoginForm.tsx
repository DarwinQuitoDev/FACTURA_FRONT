import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { login } from "../services/LoginService"
import { Link } from "react-router-dom"

interface LoginFormProps {
  onLoginSuccess: (user: any) => void
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const user = await login(email, password)
      if (remember) {
        localStorage.setItem("rememberEmail", email)
      } else {
        localStorage.removeItem("rememberEmail")
      }
      onLoginSuccess(user)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
      <div className="space-y-1">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <span>Recordar correo</span>
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
