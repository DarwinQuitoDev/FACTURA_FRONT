import axios from 'axios';

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

const BASE_URL = 'http://localhost:3000/api/persona';

export const ClienteService = {
  async getAll(): Promise<Cliente[] | null> {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get<Cliente[]>(BASE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      return null;
    }
  },

  async getById(id: number): Promise<Cliente | null> {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get<Cliente>(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el cliente con ID ${id}:`, error);
      return null;
    }
  },

  async create(cliente: CreateClienteDto): Promise<Cliente | null> {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post<Cliente>(BASE_URL, cliente, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear cliente:", error);
      return null;
    }
  },

  async update(id: number, cliente: CreateClienteDto): Promise<Cliente | null> {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put<Cliente>(`${BASE_URL}/${id}`, cliente, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar cliente`);
      return null;
      
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return true;
    } catch (error) {
      console.error(`Error al eliminar cliente con ID ${id}:`, error);
      return false;
    }
  },
};
