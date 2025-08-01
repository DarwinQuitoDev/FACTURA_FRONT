import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const SubmoduloModal = ({ submodulo, moduloId, onClose }: { submodulo?: any; moduloId?: number; onClose: () => void }) => {
  // Aquí iría el formulario de edición/creación de submódulo
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{submodulo ? 'Editar Submódulo' : 'Crear Submódulo'}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" defaultValue={submodulo?.nombre || ''} placeholder="Nombre del submódulo" />
          </div>
          <div>
            <Label htmlFor="ruta">Ruta</Label>
            <Input id="ruta" defaultValue={submodulo?.ruta || ''} placeholder="Ruta del submódulo" />
          </div>
          {/* Aquí puedes añadir más campos y lógica de guardado */}
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
