import React, { useMemo, useEffect, useState } from "react";
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
  return permisos.filter(p => {
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

  // Estado local para los cambios (batch)
  const [permisosLocales, setPermisosLocales] = useState<Permiso[]>([]);

  // Inicializa permisos locales solo cuando abre el modal o permisos originales cambian
  useEffect(() => {
    setPermisosLocales(filtrarPermisosUnicos(permisosOriginales));
  }, [permisosOriginales, open]);

  // Cambia el estado local al hacer check/uncheck
  const handleTogglePermiso = (submodulo_id: number, checked: boolean) => {
    setPermisosLocales(prev => {
      const idx = prev.findIndex(p => p.submodulo_id === submodulo_id);
      if (idx > -1) {
        // Actualiza el permitido
        return prev.map(p =>
          p.submodulo_id === submodulo_id
            ? { ...p, permitido: checked }
            : p
        );
      } else {
        // Si no existe, agrega el nuevo permiso localmente (id=0)
        return [...prev, { id: 0, submodulo_id, permitido: checked } as Permiso];
      }
    });
  };

  // Cuando presiona Guardar, guarda solo los cambios
  const handleGuardar = async () => {
    if (!rol) return;
    const originales = filtrarPermisosUnicos(permisosOriginales);
    for (const sm of submodulos) {
      const original = originales.find(p => p.submodulo_id === sm.id);
      const local = permisosLocales.find(p => p.submodulo_id === sm.id);
      const permitido = local ? !!local.permitido : false;
      // Solo si cambió respecto al original, guardar
      if (original) {
        if (original.permitido !== permitido) {
          await axiosInstance.put(`/auth/rol-submodulo-permiso/${original.id}`, {
            ...original,
            permitido,
          });
        }
      } else if (permitido) {
        // Si no existía y ahora está marcado, crea el permiso
        await axiosInstance.post(`/auth/rol-submodulo-permiso/`, {
          rol_id: rol.id,
          submodulo_id: sm.id,
          permitido,
        });
      }
      // Si desmarcó uno que no existía, no haces nada (la base nunca crea "falsos")
    }
    await refreshPermisos();
    onClose(); // Opcional: cierra el modal al guardar
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
                      const permiso = permisosLocales.find(p => p.submodulo_id === sm.id);
                      const checked = permiso ? !!permiso.permitido : false;
                      return (
                        <li key={sm.id}>
                          <label className="flex items-center justify-between px-2 py-1 bg-background rounded-md hover:bg-accent transition-colors cursor-pointer">
                            <span className="text-sm text-foreground">{sm.nombre}</span>
                            <input
                              type="checkbox"
                              className="w-4 h-4 accent-primary"
                              checked={checked}
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
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="secondary" onClick={handleGuardar}>
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AsignarModulosModal;
