import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/authProvider';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) return null; // o <Spinner /> si quieres una pantalla de carga

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};
