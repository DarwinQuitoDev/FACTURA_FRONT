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
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have tokens in localStorage
    const savedUser = localStorage.getItem('user');
    const savedAccessToken = localStorage.getItem('accessToken');
    // Validar que el usuario no sea 'undefined' ni null ni string vacía
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
  }, []);

  const login = (user: User, accessToken: string) => {
    setUser(user);
    setAccessToken(accessToken);
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    // Clear localStorage
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