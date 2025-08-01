// Servicio para consumir las APIs de submódulos con autorización Bearer
import { axiosInstance } from '@/lib/axios';

export const getSubmodulos = async () => {
  const response = await axiosInstance.get('/auth/submodulos/');
  return response.data;
};

export const getSubmoduloById = async (id: number) => {
  const response = await axiosInstance.get(`/auth/submodulos/${id}`);
  return response.data;
};

export const crearSubmodulo = async (
  data: { modulo_id: number; nombre: string; icono?: string; ruta?: string }
) => {
  const response = await axiosInstance.post('/auth/submodulos/', data);
  return response.data;
};

export const actualizarSubmodulo = async (
  id: number,
  data: {
    modulo_id: number;
    nombre: string;
    icono?: string;
    ruta?: string;
    estado?: boolean;
  }
) => {
  const response = await axiosInstance.put(`/auth/submodulos/${id}`, data);
  return response.data;
};

export const eliminarSubmodulo = async (id: number) => {
  const response = await axiosInstance.delete(`/auth/submodulos/${id}`);
  return response.data;
};
