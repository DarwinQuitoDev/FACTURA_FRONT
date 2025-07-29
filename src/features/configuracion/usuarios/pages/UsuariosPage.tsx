import React, { useEffect, useState } from 'react';
import { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, getUsuarioById } from '@/features/configuracion/usuarios/services/UsuariosService';
import UsuariosList from '@/features/configuracion/usuarios/components/UsuariosList';
import { Usuario } from '@/features/configuracion/usuarios/components/UsuariosList';
import { UsuarioForm } from '@/features/configuracion/usuarios/components/UsuarioForm';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const UsuariosPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editUsuario, setEditUsuario] = useState<Usuario | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch {
      toast({ title: 'Error', description: 'No se pudo cargar usuarios', variant: 'destructive' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await crearUsuario(data);
      toast({ title: 'Usuario creado correctamente' });
      setShowForm(false);
      fetchUsuarios();
    } catch {
      toast({ title: 'Error', description: 'No se pudo crear usuario', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleEdit = async (usuario: Usuario) => {
    setLoading(true);
    try {
      const data = await getUsuarioById(usuario.id);
      setEditUsuario(data);
      setShowForm(true);
    } catch {
      toast({ title: 'Error', description: 'No se pudo cargar el usuario', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleUpdate = async (data: any) => {
    if (!editUsuario) return;
    setLoading(true);
    try {
      await actualizarUsuario(editUsuario.id, data);
      toast({ title: 'Usuario actualizado correctamente' });
      setShowForm(false);
      setEditUsuario(null);
      fetchUsuarios();
    } catch {
      toast({ title: 'Error', description: 'No se pudo actualizar usuario', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleDelete = async (usuario: Usuario) => {
    setLoading(true);
    try {
      await eliminarUsuario(usuario.id);
      toast({ title: 'Usuario eliminado correctamente' });
      fetchUsuarios();
    } catch {
      toast({ title: 'Error', description: 'No se pudo eliminar usuario', variant: 'destructive' });
    }
    setLoading(false);
  };

  const filteredUsuarios = usuarios
    .filter(u => (u.nombre_completo ?? '').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const valA = a[sortBy as keyof Usuario];
      const valB = b[sortBy as keyof Usuario];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        return sortOrder === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
      }
      return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Usuarios</h2>
        <Button onClick={() => { setShowForm(true); setEditUsuario(null); }} className="gap-2">
          <Plus size={16} /> Nuevo Usuario
        </Button>
      </div>

      <UsuariosList
        usuarios={filteredUsuarios}
        onEdit={handleEdit}
        onDelete={handleDelete}
        search={search}
        onSearch={setSearch}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <UsuarioForm
            initialData={editUsuario || undefined}
            onSubmit={editUsuario ? handleUpdate : handleCreate}
            loading={loading}
            isEdit={!!editUsuario}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsuariosPage;
