import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "@/lib/axios";

export interface Modulo { id: number; nombre: string; }
export interface Submodulo { id: number; nombre: string; modulo_id: number; }
export interface Permiso { id: number; submodulo_id: number; permitido: boolean; }
export interface Rol { id: number; nombre: string; }

export function useAsignacionModulos(rol: Rol | null) {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [submodulos, setSubmodulos] = useState<Submodulo[]>([]);
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!rol) return;
    setLoading(true);
    setError(null);
    try {
      const [modRes, subRes, permRes] = await Promise.all([
        axiosInstance.get('/auth/modulos/'),
        axiosInstance.get('/auth/submodulos/'),
        // ¡No cambies esta línea!
        axiosInstance.get(`/auth/rol-submodulo-permiso/${rol.id}`).catch(e => {
          // Si es 404, responde array vacío y NO lo trates como error real
          if (e.response && e.response.status === 404) return { data: [] };
          throw e;
        })
      ]);
      setModulos(Array.isArray(modRes.data) ? modRes.data : []);
      setSubmodulos(Array.isArray(subRes.data) ? subRes.data : []);
      // useAsignacionModulos.ts
      setPermisos(
        Array.isArray(permRes.data)
          ? permRes.data.map((p: any) => ({
            ...p,
            permitido: !!(p.permitido === true || p.permitido === 1 || p.permitido === '1')
          }))
          : []
      );

    } catch (e: any) {
      setPermisos([]);
      setError("Error al cargar datos");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [rol]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refreshPermisos = useCallback(async () => {
    if (!rol) return;
    try {
      const { data } = await axiosInstance.get(`/auth/rol-submodulo-permiso/${rol.id}`).catch(e => {
        if (e.response && e.response.status === 404) return { data: [] };
        throw e;
      });
      setPermisos(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setPermisos([]);
      setError("Error al recargar permisos");
      console.error(e);
    }
  }, [rol]);

  return {
    modulos,
    submodulos,
    permisos,
    loading,
    error,
    refreshPermisos,
    fetchData,
  };
}
