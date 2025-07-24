// features/login/services/authService.ts daleee
import { axiosInstance } from '@/lib/axios';


interface LoginResponse {
  usuario: {
    id: number;
    nombre: string;
    username: string;
    correo: string;
    rol_id: number;
  };
  token: string;
  msg: string;
}


export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/auth/auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.msg || 'Error al iniciar sesión';
    throw new Error(errorMessage);
  }
};


// La nueva API no usa refreshToken, así que eliminamos esta función.

export { default as LoginPage } from "../pages/LoginPage";