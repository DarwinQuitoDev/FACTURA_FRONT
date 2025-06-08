import { apiGet, apiPost, apiPut, apiDelete } from '@/services/apiService';

export interface Cliente {
  id: number;
  tipo_identificacion_id: number;
  numero_identificacion: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  celular: string;
  correo_electronico: string;
  fecha_nacimiento: string;
  tipo_persona: string;
  estado_civil: string;
  genero: string;
  es_contribuyente: boolean;
  obligatorio_contabilidad: boolean;
  activo: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface CreateClienteDto {
  tipo_identificacion_id: number;
  numero_identificacion: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  celular: string;
  correo_electronico: string;
  fecha_nacimiento?: string;
  tipo_persona: "NATURAL" | "JURIDICA";
  estado_civil: "SOLTERO" | "CASADO" | "DIVORCIADO" | "VIUDO" | "UNION_LIBRE";
  genero: "MASCULINO" | "FEMENINO" | "OTRO";
  es_contribuyente: boolean;
  obligatorio_contabilidad: boolean;
  activo: boolean;
}

const BASE_URL = '/persona';

export const ClienteService = {
  async getAll(): Promise<Cliente[] | null> {
    try {
      const response = await apiGet<Cliente[]>(BASE_URL);
      return response;
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      return null;
    }
  },

  async getById(id: number): Promise<Cliente | null> {
    try {
      const response = await apiGet<Cliente>(`${BASE_URL}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error al obtener el cliente con ID ${id}:`, error);
      return null;
    }
  },

  async create(cliente: CreateClienteDto): Promise<Cliente | null> {
    try {
      const response = await apiPost<Cliente, CreateClienteDto>(BASE_URL, cliente);
      return response;
    } catch (error) {
      console.error("Error al crear cliente:", error);
      return null;
    }
  },

  async update(id: number, cliente: CreateClienteDto): Promise<Cliente | null> {
    try {
      const response = await apiPut<Cliente, CreateClienteDto>(`${BASE_URL}/${id}`, cliente);
      return response;
    } catch (error) {
      console.error(`Error al actualizar cliente:`, error);
      return null;
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      await apiDelete(`${BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar cliente con ID ${id}:`, error);
      return false;
    }
  },
};
