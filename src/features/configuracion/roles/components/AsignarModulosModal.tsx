// AsignarModulosModal.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAsignacionModulos, Rol, Permiso } from "@/features/configuracion/roles/use/useAsignacionModulos";
import { axiosInstance } from "@/lib/axios";

interface AsignarModulosModalProps {
  open: boolean;
  onClose: () => void;
  rol: Rol | null;
}

function filtrarPermisosUnicos(permisos: Permiso[]) {
  const vistos = new Set<number>();
  return permisos.filter((p: any) => {
    if (vistos.has(p.submodulo_id)) return false;
    vistos.add(p.submodulo_id);
    return true;
  });
}

const AsignarModulosModal: React.FC<AsignarModulosModalProps> = ({ open, onClose, rol }) => {
  const {
    modulos,
    submodulos,
    permisos: permisosOriginales,
    loading,
    error,
    refreshPermisos
  } = useAsignacionModulos(rol);

  const [permisosLocales, setPermisosLocales] = useState<Permiso[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPermisosLocales(filtrarPermisosUnicos(permisosOriginales));
  }, [permisosOriginales, open]);

  const handleTogglePermiso = (submodulo_id: number, checked: boolean) => {
    setPermisosLocales(prev => {
      const idx = prev.findIndex(p => p.submodulo_id === submodulo_id);
      if (idx > -1) {
        return prev.map(p =>
          p.submodulo_id === submodulo_id ? { ...p, permitido: checked } : p
        );
      }
      // si no existía, lo “creamos” localmente (id = 0)
      return [...prev, { id: 0, submodulo_id, permitido: checked } as Permiso];
    });
  };

  const handleGuardar = async () => {
    if (!rol) return;
    setSaving(true);
    try {
      // mapa de originales para comparar rápido
      const originalesUnicos = filtrarPermisosUnicos(permisosOriginales);
      const originalesMap = new Map<number, Permiso & { id: number }>();
      originalesUnicos.forEach((p: any) => originalesMap.set(p.submodulo_id, p));

      // por cada submódulo visible, decidir si hay que crear/actualizar o no hacer nada
      const peticiones: Promise<any>[] = [];

      for (const sm of submodulos) {
        const original = originalesMap.get(sm.id);             // puede ser undefined si no existe aún
        const local = permisosLocales.find(p => p.submodulo_id === sm.id);

        const permitidoDeseado = local ? !!local.permitido : false; // por defecto false si no tocó nada

        if (!original && !permitidoDeseado) {
          // no existía y sigue en false => nada que guardar
          continue;
        }

        if (!original && permitidoDeseado) {
          // no existía y ahora true => CREAR
          peticiones.push(
            axiosInstance.post(`/auth/rol-submodulo-permiso/`, {
              rol_id: rol.id,
              submodulo_id: sm.id,
              permiso_id: null,          // tu tabla lo permite, lo mandamos explícito
              permitido: true,
            })
          );
          continue;
        }

        // desde aquí: original existe
        const originalBool = !!(original as any).permitido;
        if (originalBool !== permitidoDeseado) {
          // CAMBIÓ => actualizar explícito con PUT por ID
          peticiones.push(
            axiosInstance.put(`/auth/rol-submodulo-permiso/${(original as any).id}`, {
              // solo mandamos campos que sí quieres permitir actualizar
              rol_id: rol.id,
              submodulo_id: sm.id,
              permiso_id: null, // o el valor real si lo tienes
              permitido: permitidoDeseado,
            })
          );

          // Si prefieres usar tu DELETE que alterna, podrías llamar:
          // if (permitidoDeseado !== originalBool) {
          //   peticiones.push(axiosInstance.delete(`/auth/rol-submodulo-permiso/${(original as any).id}`));
          // }
          // Pero es mejor PUT explícito como arriba para dejar el estado exacto.
        }
      }

      if (peticiones.length) {
        await Promise.all(peticiones);
      }

      await refreshPermisos();
      onClose();
    } catch (e) {
      console.error(e);
      // aquí puedes mostrar un toast de error si lo usas en tu app
    } finally {
      setSaving(false);
    }
  };

  if (!rol) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Asignar submódulos al rol: <span className="text-primary">{rol.nombre}</span>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="text-center text-muted-foreground py-8">
            Cargando módulos y submódulos...
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-8">
            {error}
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {modulos.map((modulo) => (
              <div
                key={modulo.id}
                className="border border-border rounded-lg p-4 bg-muted/50"
              >
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {modulo.nombre}
                </h3>
                <ul className="space-y-2">
                  {submodulos
                    .filter(sm => sm.modulo_id === modulo.id)
                    .map(sm => {
                      const permiso = permisosLocales.find(p => p.submodulo_id === sm.id) as any;
                      const checked = permiso ? !!permiso.permitido : false;

                      return (
                        <li key={sm.id}>
                          <label className="flex items-center justify-between px-2 py-1 bg-background rounded-md hover:bg-accent transition-colors cursor-pointer">
                            <span className="text-sm text-foreground">{sm.nombre}</span>
                            <input
                              type="checkbox"
                              className="w-4 h-4 accent-primary"
                              checked={checked}
                              disabled={saving}
                              onChange={e => handleTogglePermiso(sm.id, e.target.checked)}
                            />
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cerrar
          </Button>
          <Button variant="secondary" onClick={handleGuardar} disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AsignarModulosModal;
