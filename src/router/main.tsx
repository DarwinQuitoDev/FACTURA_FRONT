import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Componentes
import { ThemeProvider } from '@/contexts/appProvider';
import { AuthProvider } from '@/contexts/authProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/pages/mainLayout';
import LoginPage from '@/features/login/pages/loginPage';

//Pages - Dashboard
import DashboardPage from '@/features/dashboard/pages/DashboardPage';

//Pages - Personas
import ClientesPage from '@/features/personas/pages/ClientesPage';
import ProveedoresPage from '@/features/personas/pages/ProveedoresPage';
import UsuariosPage from '@/features/personas/pages/UsuariosPage';
import RolesPage from '@/features/personas/pages/RolesPage';

//Pages - Inventario
import ProductosPage from '@/features/inventario/pages/ProductosPage';
import CategoriasPage from '@/features/inventario/pages/CategoriasPage';
import BodegasPage from '@/features/inventario/pages/BodegasPage';
import MovimientosPage from '@/features/inventario/pages/MovimientosPage';

//Pages - Ventas
import VentasPage from '@/features/ventas/pages/VentasPage';
import FacturacionPage from '@/features/ventas/pages/FacturacionPage';
import DocumentosElectronicosPage from '@/features/ventas/pages/DocumentosElectronicosPage';

//Pages - Compras
import ComprasPage from '@/features/compras/pages/ComprasPage';
import OrdenesCompraPage from '@/features/compras/pages/OrdenesCompraPage';

//Pages - Finanzas
import CuentasCobrarPage from '@/features/finanzas/pages/CuentasCobrarPage';
import CuentasPagarPage from '@/features/finanzas/pages/CuentasPagarPage';
import FormasPagoPage from '@/features/finanzas/pages/FormasPagoPage';

//Pages - Configuración
import ConfiguracionPage from '@/features/configuracion/pages/ConfiguracionPage';

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

            {/* Personas */}
            <Route path="personas">
              <Route path="clientes" element={<ClientesPage />} />
              <Route path="proveedores" element={<ProveedoresPage />} />
              <Route path="usuarios" element={<UsuariosPage />} />
              <Route path="roles" element={<RolesPage />} />
            </Route>

            {/* Inventario */}
            <Route path="inventario">
              <Route path="productos" element={<ProductosPage />} />
              <Route path="categorias" element={<CategoriasPage />} />
              <Route path="bodegas" element={<BodegasPage />} />
              <Route path="movimientos" element={<MovimientosPage />} />
            </Route>

            {/* Ventas */}
            <Route path="ventas">
              <Route path="facturas" element={<VentasPage />} />
              <Route path="facturacion" element={<FacturacionPage />} />
              <Route path="documentos" element={<DocumentosElectronicosPage />} />
            </Route>

            {/* Compras */}
            <Route path="compras">
              <Route path="ordenes" element={<ComprasPage />} />
              <Route path="nueva" element={<OrdenesCompraPage />} />
            </Route>

            {/* Finanzas */}
            <Route path="finanzas">
              <Route path="cuentas-cobrar" element={<CuentasCobrarPage />} />
              <Route path="cuentas-pagar" element={<CuentasPagarPage />} />
              <Route path="formas-pago" element={<FormasPagoPage />} />
            </Route>

            {/* Configuración */}
            <Route path="configuracion" element={<ConfiguracionPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
