import axios from "axios";

interface Empresa {
  id?: number;
  ruc: string;
  razon_social: string;
  nombre_comercial: string;
  direccion_matriz: string;
  telefono: string;
  email: string;
  website?: string;
  fecha_inicio_actividades: string;
  obligado_contabilidad: boolean;
  lleva_contabilidad: boolean;
  agente_retencion: boolean;
  contribuyente_especial: boolean;
  resolucion_contribuyente?: string;
  logo_url?: string;
}

const BASE_URL = "http://localhost:3000/api/empresa";

export const EmpresaService = {
  // Crear empresa
  create: async (empresa: Empresa) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(BASE_URL, empresa, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Obtener todas las empresas
  getAll: async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Obtener empresa por ID
  getById: async (id: number) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  },

  // Actualizar empresa
  update: async (id: number, empresa: Empresa) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(`${BASE_URL}/${id}`, empresa, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Eliminar empresa
  delete: async (id: number) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },
};

export type { Empresa };