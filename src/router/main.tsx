import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Contextos
import { ThemeProvider } from '@/contexts/appProvider';
import { AuthProvider } from '@/contexts/authProvider';

// Componentes
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/pages/mainLayout';

// Páginas
import LoginPage from '@/features/login/pages/LoginPage';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';

// Modulos de cumplimiento
import ListaCumplimiento from '@/features/cumplimiento/peps/peps';

// Módulos de configuración
import UsuariosPage from '@/features/configuracion/usuarios/pages/UsuariosPage';
import RolesPage from '@/features/configuracion/roles/pages/RolesPage';
import ModulosPage from '@/features/configuracion/modulos/pages/ModulosPage';

// Estilos
import '../index.css'



createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Página de login */}
          <Route path='/login' element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Página de inicio (Dashboard) */}
            <Route index element={<DashboardPage />} />

            {/* Módulo de cumplimiento */}
            <Route path="cumplimiento/listas" element={<ListaCumplimiento />} />

            {/* Módulo de configuracion */}
            <Route path="/configuracion/usuarios" element={<UsuariosPage />} />
            <Route path="/configuracion/roles" element={<RolesPage />} />
            <Route path="/configuracion/modulos" element={<ModulosPage />} />



            {/* Ruta comodín dentro de rutas protegidas: redirige a "/" */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
