import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "../services/LoginService";
import { useAuth } from "@/contexts/authProvider";
import { Loader2 } from "lucide-react";

interface LoginResponse {
  user: {
    id: number;
    nombre_usuario: string;
    correo: string;
  };
  accessToken: string;
  refreshToken?: string;
}

interface LoginFormProps {
  onLoginSuccess: (response: LoginResponse) => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await login(username, password);

      if (remember) {
        localStorage.setItem("rememberUsuario", username);
      } else {
        localStorage.removeItem("rememberUsuario");
      }

      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.usuario));
      auth.login(response.usuario, response.token);
      onLoginSuccess({ user: response.usuario, accessToken: response.token });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Usuario
        </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Nombre del usuario"
          autoComplete="username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      {error && (
        <p className="text-center text-sm text-red-500 font-medium bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-md">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="animate-spin h-4 w-4" />}
        {loading ? "Cargando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
};

export default LoginForm;
