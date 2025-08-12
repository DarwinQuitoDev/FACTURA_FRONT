import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Usuario } from './UsuariosList';
import { Loader2 } from 'lucide-react';
import {axiosInstance} from '@/lib/axios'; // ajusta si tu instancia está en otra ruta

interface UsuarioFormProps {
  initialData?: Partial<Usuario>;
  onSubmit: (data: any) => void;
  loading?: boolean;
  isEdit?: boolean;
}

type Rol = {
  id: number;
  nombre: string;
  descripcion?: string;
  estado?: boolean;
};

export const UsuarioForm: React.FC<UsuarioFormProps> = ({
  initialData = {},
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  // --- Crear ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [correoCreate, setCorreoCreate] = useState('');

  // --- Editar ---
  const [nombre_completo, setNombre] = useState(initialData.nombre_completo || '');
  const [correo, setCorreo] = useState(initialData.correo || '');
  const [activo, setActivo] = useState(initialData.activo ?? true);

  // --- Roles ---
  const [roles, setRoles] = useState<Rol[]>([]);
  const [rolesLoading, setRolesLoading] = useState<boolean>(true);
  const [rolesError, setRolesError] = useState<string | null>(null);
  const [rolId, setRolId] = useState<number>(
    typeof initialData.rol_id === 'number' ? initialData.rol_id : 0
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setRolesLoading(true);
        setRolesError(null);
        // Ajusta el endpoint si corresponde. Puedes filtrar activos: /auth/roles?estado=true
        const { data } = await axiosInstance.get('/auth/roles');
        if (!mounted) return;

        const lista: Rol[] = Array.isArray(data) ? data : data?.roles || [];
        setRoles(lista);

        // Si no hay valor seleccionado, selecciona el primero disponible
        if (!rolId && lista.length > 0) {
          setRolId(lista[0].id);
        }
      } catch (err: any) {
        setRolesError('No se pudieron cargar los roles.');
      } finally {
        if (mounted) setRolesLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(rolId)
    if (isEdit) {
      // PUT /auth/usuarios/:id  -> { nombre_completo, correo, rol_id, activo }
      onSubmit({ nombre_completo, correo, rol_id: rolId, activo });
    } else {
      // POST /auth/usuarios -> { username, correo, password, rol_id }
      onSubmit({ username, correo: correoCreate, password, rol_id: rolId });
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
              value={rolId ? String(rolId) : ''}
              onChange={(e) => setRolId(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={rolesLoading || !!rolesError}
              required
            >
              {rolesLoading && <option value="">Cargando roles...</option>}
              {rolesError && <option value="">Error cargando roles</option>}
              {!rolesLoading && !rolesError && roles.length === 0 && (
                <option value="">No hay roles disponibles</option>
              )}
              {!rolesLoading &&
                !rolesError &&
                roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
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

          <div>
            <Label htmlFor="rol">Rol</Label>
            <select
              id="rol"
              value={rolId ? String(rolId) : ''}
              onChange={(e) => setRolId(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={rolesLoading || !!rolesError}
              required
            >
              {rolesLoading && <option value="">Cargando roles...</option>}
              {rolesError && <option value="">Error cargando roles</option>}
              {!rolesLoading && !rolesError && roles.length === 0 && (
                <option value="">No hay roles disponibles</option>
              )}
              {!rolesLoading &&
                !rolesError &&
                roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
            </select>
          </div>
        </>
      )}

      <Button
        type="submit"
        disabled={loading || rolesLoading || !!rolesError}
        className="w-full flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="animate-spin w-4 h-4" />}
        {isEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
      </Button>
    </form>
  );
};
