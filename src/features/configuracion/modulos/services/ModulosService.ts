// Servicio para consumir las APIs de módulos con autorización Bearer
import { axiosInstance } from '@/lib/axios';

export const getModulos = async () => {
  const response = await axiosInstance.get('/auth/modulos/');
  return response.data;
};

export const getModuloById = async (id: number) => {
  const response = await axiosInstance.get(`/auth/modulos/${id}`);
  return response.data;
};

export const crearModulo = async (
  data: { nombre: string; icono?: string; ruta?: string }
) => {
  const response = await axiosInstance.post('/auth/modulos/', data);
  return response.data;
};

export const actualizarModulo = async (
  id: number,
  data: { nombre: string; icono?: string; ruta?: string; estado?: boolean }
) => {
  const response = await axiosInstance.put(`/auth/modulos/${id}`, data);
  return response.data;
};

export const eliminarModulo = async (id: number) => {
  const response = await axiosInstance.delete(`/auth/modulos/${id}`);
  return response.data;
};
