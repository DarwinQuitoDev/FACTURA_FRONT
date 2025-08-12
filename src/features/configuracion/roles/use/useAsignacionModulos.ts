// useAsignacionModulos.ts
import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "@/lib/axios";

export interface Modulo { id: number; nombre: string; }
export interface Submodulo { id: number; nombre: string; modulo_id: number; }
export interface Permiso { id: number; submodulo_id: number; permitido: boolean | number | string; }
export interface Rol { id: number; nombre: string; }

// Utilidad para normalizar tinyint(1) / 0/1 / "0"/"1" a boolean
const toBool = (v: any) => v === true || v === 1 || v === "1";

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

        // NOTA: si tu backend realmente expone GetByRol como /auth/rol-submodulo-permiso/Rol/:rolId
        // cambia esta línea por esa ruta. Mantengo tu ruta original para no romper nada.
        axiosInstance.get(`/auth/rol-submodulo-permiso/Rol/${rol.id}`).catch((e) => {
          if (e?.response?.status === 404) return { data: [] };
          throw e;
        }),
      ]);

      setModulos(Array.isArray(modRes.data) ? modRes.data : []);
      setSubmodulos(Array.isArray(subRes.data) ? subRes.data : []);

      const perms = Array.isArray(permRes.data) ? permRes.data : [];
      setPermisos(
        perms.map((p: any) => ({
          ...p,
          permitido: toBool(p.permitido),
        }))
      );
    } catch (e: any) {
      console.error(e);
      setPermisos([]);
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, [rol]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refreshPermisos = useCallback(async () => {
    if (!rol) return;
    try {
      const { data } = await axiosInstance
        .get(`/auth/rol-submodulo-permiso/Rol/${rol.id}`)
        .catch((e) => {
          if (e?.response?.status === 404) return { data: [] };
          throw e;
        });

      const perms = Array.isArray(data) ? data : [];
      setPermisos(
        perms.map((p: any) => ({
          ...p,
          permitido: toBool(p.permitido),
        }))
      );
    } catch (e: any) {
      console.error(e);
      setPermisos([]);
      setError("Error al recargar permisos");
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
