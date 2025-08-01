import React from 'react';
import { Button } from '@/components/ui/button';
import { Pen, ShieldBan, ShieldCheck, Trash2 } from 'lucide-react';

export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  estado?: boolean;
}

interface RolesListProps {
  roles?: Rol[];
  onEdit: (rol: Rol) => void;
  onDelete: (rol: Rol) => void;
}

const RolesList: React.FC<RolesListProps> = ({ roles = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg shadow-sm text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.id} className="border-b">
              <td className="px-4 py-2 text-center">{rol.id}</td>
              <td className="px-4 py-2">{rol.nombre}</td>
              <td className="px-4 py-2">{rol.descripcion}</td>
              <td className="px-4 py-2 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${rol.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {rol.estado ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2 justify-center">
                <Button size="sm" variant="outline" onClick={() => onEdit(rol)}>
                  <Pen size={16} />
                </Button>
                <Button className={`${!rol.estado ? 'bg-green-300 text-green-700' : 'bg-red-100 text-red-700'}`} size="sm" onClick={() => onDelete(rol)}>
                   {!rol.estado ? <ShieldCheck size={16} /> : <ShieldBan size={16} />}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesList;
