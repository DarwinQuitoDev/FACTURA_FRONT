import React, { useEffect, useState } from 'react';
import { getRoles, crearRol, actualizarRol, eliminarRol, getRolById } from '@/features/configuracion/roles/services/RolesService';
import RolesList, { Rol } from '@/features/configuracion/roles/components/RolesList';
import { RolForm } from '@/features/configuracion/roles/components/RolForm';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editRol, setEditRol] = useState<Rol | null>(null);
  const { toast } = useToast();

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const data = await getRoles();
      setRoles(data);
    } catch {
      toast({ title: 'Error', description: 'No se pudo cargar roles', variant: 'destructive' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await crearRol(data);
      toast({ title: 'Rol creado correctamente' });
      setShowForm(false);
      fetchRoles();
    } catch {
      toast({ title: 'Error', description: 'No se pudo crear rol', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleEdit = async (rol: Rol) => {
    setLoading(true);
    try {
      const data = await getRolById(rol.id);
      setEditRol(data);
      setShowForm(true);
    } catch {
      toast({ title: 'Error', description: 'No se pudo cargar el rol', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleUpdate = async (data: any) => {
    if (!editRol) return;
    setLoading(true);
    try {
      await actualizarRol(editRol.id, data);
      toast({ title: 'Rol actualizado correctamente' });
      setShowForm(false);
      setEditRol(null);
      fetchRoles();
    } catch {
      toast({ title: 'Error', description: 'No se pudo actualizar rol', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleDelete = async (rol: Rol) => {
    setLoading(true);
    try {
      await eliminarRol(rol.id);
      toast({ title: 'Rol eliminado correctamente' });
      fetchRoles();
    } catch {
      toast({ title: 'Error', description: 'No se pudo eliminar rol', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Roles</h2>
        <Button onClick={() => { setEditRol(null); setShowForm(true); }}>
          <Plus className="mr-2" /> Nuevo Rol
        </Button>
      </div>
      <RolesList roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <RolForm
            initialData={editRol || {}}
            onSubmit={editRol ? handleUpdate : handleCreate}
            loading={loading}
            isEdit={!!editRol}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RolesPage;
