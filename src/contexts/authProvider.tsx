import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nombre: string;
  username: string;
  correo: string;
  rol_id: number;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false); // Nuevo estado
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAccessToken = localStorage.getItem('accessToken');

    if (
      savedUser &&
      savedUser !== 'undefined' &&
      savedUser !== '' &&
      savedAccessToken &&
      savedAccessToken !== 'undefined' &&
      savedAccessToken !== ''
    ) {
      try {
        setUser(JSON.parse(savedUser));
        setAccessToken(savedAccessToken);
      } catch (e) {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    } else {
      setUser(null);
      setAccessToken(null);
    }

    setIsReady(true); // Activar solo cuando terminó la lectura
  }, []);

  const login = (user: User, accessToken: string) => {
    setUser(user);
    setAccessToken(accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      login,
      logout,
      isAuthenticated: !!user && !!accessToken,
      isReady
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
