import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Componentes
import { ThemeProvider } from '@/contexts/appProvider';
import MainLayout from '@/components/layout/pages/mainLayout';
import LoginPage from '@/features/login/pages/loginPage';

//Styles
import '../index.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path='login' element ={<LoginPage />} />
        <Route path='/' element={<MainLayout />} >
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  ,
)
