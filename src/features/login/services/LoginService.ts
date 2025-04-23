// features/login/services/authService.ts daleee
import { axiosInstance } from '@/lib/axios';

interface LoginResponse {
  user: {
    id: number;
    nombre_usuario: string;
    correo: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const login = async (usuario: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      usuario,
      password,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Error al iniciar sesión';
    throw new Error(errorMessage);
  }
};

export const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/auth/refresh', { refreshToken });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Error al refrescar el token';
    throw new Error(errorMessage);
  }
};

export { default as LoginPage } from "../pages/loginPage";