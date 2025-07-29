import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'; // Asegúrate de tener este componente o usa un checkbox
import { Usuario } from './UsuariosList';
import { Loader2 } from 'lucide-react';

interface UsuarioFormProps {
  initialData?: Partial<Usuario>;
  onSubmit: (data: any) => void;
  loading?: boolean;
  isEdit?: boolean;
}

export const UsuarioForm: React.FC<UsuarioFormProps> = ({
  initialData = {},
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  // Campos para creación
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [correoCreate, setCorreoCreate] = useState('');

  // Campos para edición
  const [nombre_completo, setNombre] = useState(initialData.nombre_completo || '');
  const [correo, setCorreo] = useState(initialData.correo || '');
  const [rol, setRol] = useState(initialData.rol_id || 'usuario');
  const [activo, setActivo] = useState(initialData.activo ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      onSubmit({ nombre_completo, correo, rol, activo });
    } else {
      onSubmit({ username, password, correo: correoCreate });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <h3 className="text-2xl font-bold text-center text-gray-800">
        {isEdit ? 'Editar Usuario' : 'Registrar Usuario'}
      </h3>

      {isEdit ? (
        <>
          <div>
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input
              id="nombre"
              value={nombre_completo}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div>
            <Label htmlFor="correo">Correo electrónico</Label>
            <Input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              placeholder="usuario@ejemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="rol">Rol</Label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="activo" className="flex items-center gap-2">
              <span>Activo</span>
              <Switch
                id="activo"
                checked={activo}
                onCheckedChange={(checked) => setActivo(checked)}
              />
            </Label>
          </div>
        </>
      ) : (
        <>
          <div>
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Ej. jdoe"
            />
          </div>

          <div>
            <Label htmlFor="correoCreate">Correo electrónico</Label>
            <Input
              id="correoCreate"
              type="email"
              value={correoCreate}
              onChange={(e) => setCorreoCreate(e.target.value)}
              required
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
        </>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="animate-spin w-4 h-4" />}
        {isEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
      </Button>
    </form>
  );
};
