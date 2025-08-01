import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ModuloModal = ({ modulo, onClose }: { modulo?: any; onClose: () => void }) => {
  // Aquí iría el formulario de edición/creación de módulo
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{modulo ? 'Editar Módulo' : 'Crear Módulo'}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" defaultValue={modulo?.nombre || ''} placeholder="Nombre del módulo" />
          </div>
          <div>
            <Label htmlFor="ruta">Ruta</Label>
            <Input id="ruta" defaultValue={modulo?.ruta || ''} placeholder="Ruta del módulo" />
          </div>
          {/* Aquí puedes añadir más campos y lógica de guardado */}
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
