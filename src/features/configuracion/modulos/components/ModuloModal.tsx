
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ModuloModalProps {
  modulo?: any;
  onClose: () => void;
  onSave: (data: { nombre: string; ruta?: string; icono?: string; estado?: boolean }) => void;
}

const ModuloModal: React.FC<ModuloModalProps> = ({ modulo, onClose, onSave }) => {
  const nombreRef = useRef<HTMLInputElement>(null);
  const rutaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nombre = nombreRef.current?.value || '';
    const ruta = rutaRef.current?.value || '';
    // Puedes agregar más campos aquí si es necesario
    onSave({ nombre, ruta });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{modulo ? 'Editar Módulo' : 'Crear Módulo'}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" ref={nombreRef} defaultValue={modulo?.nombre || ''} placeholder="Nombre del módulo" />
          </div>
          <div>
            <Label htmlFor="ruta">Ruta</Label>
            <Input id="ruta" ref={rutaRef} defaultValue={modulo?.ruta || ''} placeholder="Ruta del módulo" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={onClose}>Cerrar</Button>
            <Button variant="outline" type="submit">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModuloModal;
