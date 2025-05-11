import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Componentes
import { ThemeProvider } from '@/contexts/appProvider';
import { AuthProvider } from '@/contexts/authProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/pages/mainLayout';
import LoginPage from '@/features/login/pages/loginPage';

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
            {/* Add your protected routes here as children of MainLayout */}
            {/* For example: */}
            {/* <Route path="dashboard" element={<Dashboard />} /> */}
            {/* <Route path="facturas" element={<Facturas />} /> */}
            {/* <Route path="clientes" element={<Clientes />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
