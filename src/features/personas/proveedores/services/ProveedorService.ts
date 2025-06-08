import { apiDelete, apiGet, apiPost, apiPut } from "@/services/apiService";

interface Proveedor {
  id?: number;
  persona_id?: number;
  nombre_comercial: string;
  contacto_principal: string;
  telefono_contacto: string;
  email_contacto: string;
  plazo_pago: number;
  limite_credito?: number | null;
  es_agente_retencion: boolean;
  activo: boolean;
  fecha_creacion?: string;
  fecha_actualizacion?: string | null;
}

const BASE_URL = '/proveedor';

export const getProveedores = () => {
  return apiGet<Proveedor[]>(BASE_URL);
};

export const getProveedor = (id: number) => {
  return apiGet<Proveedor>(`${BASE_URL}/${id}`);
};

export const createProveedor = (data: Omit<Proveedor, 'id'>) => {
  return apiPost<Proveedor, Omit<Proveedor, 'id'>>(BASE_URL, data);
};

export const updateProveedor = (id: number, data: Partial<Proveedor>) => {
  return apiPut<Proveedor, Partial<Proveedor>>(`${BASE_URL}/${id}`, data);
};

export const deleteProveedor = (id: number) => {
  return apiDelete<void>(`${BASE_URL}/${id}`);
};

export type { Proveedor };
