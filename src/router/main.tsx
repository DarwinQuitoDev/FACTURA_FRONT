import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Componentes
import { ThemeProvider } from '@/contexts/ThemeProvider';
import MainLayout from '@/layout/MainLayout.tsx';
import LoginPage from '@/features/login/pages/LoginPage';
import Audit from '@/features/audit/Audit';

//Styles
import '../index.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path='login' element ={<LoginPage />} />
        <Route path='/' element={<MainLayout />} >
          <Route path='auditoria' element={<Audit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  ,
)
