// Servicio para consumir las APIs de roles con autorización Bearer
import { axiosInstance } from '@/lib/axios';

export const getRoles = async () => {
  const response = await axiosInstance.get('/auth/roles/');
  return response.data;
};

export const getRolById = async (id: number) => {
  const response = await axiosInstance.get(`/auth/roles/${id}`);
  return response.data;
};

export const crearRol = async (
  data: { nombre: string; descripcion: string }
) => {
  const response = await axiosInstance.post('/auth/roles/', data);
  return response.data;
};

export const actualizarRol = async (
  id: number,
  data: { nombre: string; descripcion: string; estado?: boolean }
) => {
  const response = await axiosInstance.put(`/auth/roles/${id}`, data);
  return response.data;
};

export const eliminarRol = async (id: number) => {
  const response = await axiosInstance.delete(`/auth/roles/${id}`);
  return response.data;
};
