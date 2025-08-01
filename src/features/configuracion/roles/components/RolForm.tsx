import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Rol } from './RolesList';
import { Loader2 } from 'lucide-react';

interface RolFormProps {
  initialData?: Partial<Rol>;
  onSubmit: (data: any) => void;
  loading?: boolean;
  isEdit?: boolean;
}

export const RolForm: React.FC<RolFormProps> = ({
  initialData = {},
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const [descripcion, setDescripcion] = useState(initialData.descripcion || '');
  const [estado, setEstado] = useState(initialData.estado ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      onSubmit({ nombre, descripcion, estado });
    } else {
      onSubmit({ nombre, descripcion });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <h3 className="text-2xl font-bold text-center text-gray-800">
        {isEdit ? 'Editar Rol' : 'Registrar Rol'}
      </h3>
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          placeholder="Ej. Cumplimiento"
        />
      </div>
      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Input
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          placeholder="Ej. Área de cumplimiento"
        />
      </div>
      {isEdit && (
        <div className="flex items-center gap-2">
          <Label htmlFor="estado">Activo</Label>
          <Switch id="estado" checked={estado} onCheckedChange={setEstado} />
        </div>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : isEdit ? 'Actualizar' : 'Registrar'}
      </Button>
    </form>
  );
};
