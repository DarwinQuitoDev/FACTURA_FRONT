import { useTheme } from "@/contexts/appProvider";
import { useAuth } from "@/contexts/authProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import LoginForm from "../components/LoginForm";
import { ParticlesBackground } from "@/components/background/particlesBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Warehouse } from "lucide-react";

import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = (response: any) => {
    login(response.user, response.accessToken);
    toast.success("✅ Sesión iniciada correctamente");
    navigate("/", { replace: true });
  };

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={`${resolvedTheme} min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-black to-slate-900 text-slate-100"
          : "bg-gradient-to-br from-slate-100 to-white text-slate-800"
      } relative overflow-hidden`}
    >
      <ParticlesBackground
        theme={isDark ? "dark" : "light"}
        className="z-0"
        particleCount={300}
        opacity={0.25}
      />

      <div className="flex flex-col items-center justify-center h-screen px-4 z-10 relative">

        <div className="w-full max-w-lg">
          <Card
            className={`${
              isDark
                ? "bg-slate-900/60 border-slate-700/50"
                : "bg-white/70 border-slate-200/50"
            } backdrop-blur-md shadow-xl rounded-2xl overflow-hidden`}
          >
            <CardHeader
              className={`pb-3 ${
                isDark ? "border-b border-slate-700/50" : "border-b border-slate-200/50"
              }`}
            >
              <div className="flex items-center justify-center">
                <CardTitle
                  className={`flex items-center gap-1 text-xl pt-3 font-semibold ${
                    isDark ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  <Warehouse
                    className={`h-6 w-6 ${
                      isDark ? "text-cyan-400" : "text-blue-600"
                    }`}
                  />
                  Sistema tratamiento de Listas
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </CardContent>
          </Card>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default LoginPage;

