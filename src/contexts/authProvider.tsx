import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nombre_usuario: string;
  correo: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have tokens in localStorage
    const savedUser = localStorage.getItem('user');
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedRefreshToken = localStorage.getItem('refreshToken');

    if (savedUser && savedAccessToken && savedRefreshToken) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedAccessToken);
      setRefreshToken(savedRefreshToken);
    }
  }, []);

  const login = (user: User, accessToken: string, refreshToken: string) => {
    setUser(user);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      refreshToken,
      login,
      logout,
      isAuthenticated: !!user && !!accessToken
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