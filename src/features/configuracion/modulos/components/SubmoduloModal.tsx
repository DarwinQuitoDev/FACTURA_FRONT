
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SubmoduloModalProps {
  submodulo?: any;
  moduloId?: number;
  onClose: () => void;
  onSave: (data: { modulo_id: number; nombre: string; ruta?: string; icono?: string; estado?: boolean }) => void;
}

const SubmoduloModal: React.FC<SubmoduloModalProps> = ({ submodulo, moduloId, onClose, onSave }) => {
  const nombreRef = useRef<HTMLInputElement>(null);
  const rutaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nombre = nombreRef.current?.value || '';
    const ruta = rutaRef.current?.value || '';
    // Puedes agregar más campos aquí si es necesario
    if (!moduloId && !submodulo?.modulo_id) return;
    onSave({
      modulo_id: moduloId ?? submodulo.modulo_id,
      nombre,
      ruta,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{submodulo ? 'Editar Submódulo' : 'Crear Submódulo'}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" ref={nombreRef} defaultValue={submodulo?.nombre || ''} placeholder="Nombre del submódulo" />
          </div>
          <div>
            <Label htmlFor="ruta">Ruta</Label>
            <Input id="ruta" ref={rutaRef} defaultValue={submodulo?.ruta || ''} placeholder="Ruta del submódulo" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={onClose}>Cerrar</Button>
            <Button variant="success" type="submit">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmoduloModal;
