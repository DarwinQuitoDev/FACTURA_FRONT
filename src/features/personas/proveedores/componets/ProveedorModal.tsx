import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Proveedor, createProveedor, updateProveedor } from "../services/ProveedorService";

interface ProveedorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  proveedor?: Proveedor;
}

export function ProveedorModal({ isOpen, onClose, onSuccess, proveedor }: ProveedorModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Proveedor>>(
    proveedor || {
      nombre_comercial: "",
      contacto_principal: "",
      telefono_contacto: "",
      email_contacto: "",
      plazo_pago: 0,
      limite_credito: null,
      es_agente_retencion: false,
      activo: true,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (proveedor?.id) {
        await updateProveedor(proveedor.id, formData);
        toast({
          title: "Proveedor actualizado",
          description: "El proveedor se ha actualizado correctamente",
        });
      } else {
        await createProveedor(formData as Omit<Proveedor, 'id'>);
        toast({
          title: "Proveedor creado",
          description: "El proveedor se ha creado correctamente",
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al guardar el proveedor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {proveedor ? "Editar Proveedor" : "Nuevo Proveedor"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre_comercial">Nombre Comercial</Label>
              <Input
                id="nombre_comercial"
                value={formData.nombre_comercial}
                onChange={(e) =>
                  setFormData({ ...formData, nombre_comercial: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contacto_principal">Contacto Principal</Label>
              <Input
                id="contacto_principal"
                value={formData.contacto_principal}
                onChange={(e) =>
                  setFormData({ ...formData, contacto_principal: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefono_contacto">Teléfono</Label>
              <Input
                id="telefono_contacto"
                value={formData.telefono_contacto}
                onChange={(e) =>
                  setFormData({ ...formData, telefono_contacto: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email_contacto">Email</Label>
              <Input
                id="email_contacto"
                type="email"
                value={formData.email_contacto}
                onChange={(e) =>
                  setFormData({ ...formData, email_contacto: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plazo_pago">Plazo de Pago (días)</Label>
              <Input
                id="plazo_pago"
                type="number"
                value={formData.plazo_pago}
                onChange={(e) =>
                  setFormData({ ...formData, plazo_pago: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="limite_credito">Límite de Crédito</Label>
              <Input
                id="limite_credito"
                type="number"
                step="0.01"
                value={formData.limite_credito || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    limite_credito: e.target.value ? parseFloat(e.target.value) : null,
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="es_agente_retencion">Agente de Retención</Label>
              <Switch
                id="es_agente_retencion"
                checked={formData.es_agente_retencion}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, es_agente_retencion: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="activo">Activo</Label>
              <Switch
                id="activo"
                checked={formData.activo}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, activo: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
