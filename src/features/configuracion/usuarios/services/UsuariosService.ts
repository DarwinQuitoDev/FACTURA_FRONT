// Servicio para consumir las APIs de usuarios con autorización Bearer
import { axiosInstance } from '@/lib/axios';

export const getUsuarios = async () => {
  const response = await axiosInstance.get('/auth/usuarios');
  console.log('Usuarios fetched:', response.data);
  return response.data;
};

export const getUsuarioById = async (id: number) => {
  const response = await axiosInstance.post(`/auth/usuarios/id/${id}`);
  return response.data;
};

export const crearUsuario = async (
  data: { username: string; password: string; correo: string }
) => {
  const response = await axiosInstance.post('/auth/usuarios', data);
  return response.data;
};

export const actualizarUsuario = async (
  id: number,
  data: { nombre_completo?: string; correo?: string; rol_id?: string; activo?: boolean }
) => {
  const response = await axiosInstance.put(`/auth/usuarios/${id}`, data);
  return response.data;
};

export const eliminarUsuario = async (id: number) => {
  const response = await axiosInstance.delete(`/auth/usuarios/${id}`);
  return response.data;
};
