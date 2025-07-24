import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Componentes
import { ThemeProvider } from '@/contexts/appProvider';
import { AuthProvider } from '@/contexts/authProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

import MainLayout from '@/components/layout/pages/mainLayout';
import LoginPage from '@/features/login/pages/LoginPage';

import ListaCumplimiento from '@/features/cumplimiento/peps/peps'

//Pages - Dashboard
import DashboardPage from '@/features/dashboard/pages/DashboardPage';

//Styles
import '../index.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          
          <Route path='/' element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            {/* Dashboard */}
            <Route index element={<DashboardPage />} />

             <Route path="cumplimiento">
              <Route path="listas" element={<ListaCumplimiento />} />
            </Route>

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
