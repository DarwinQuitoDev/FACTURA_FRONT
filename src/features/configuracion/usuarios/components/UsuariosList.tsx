import React from 'react';
import { Button } from '@/components/ui/button';
import { Pen, Search, ShieldCheck, ShieldBan   } from 'lucide-react';

export interface Usuario {
    id: number;
    nombre_completo: string;
    correo: string;
    rol_id: number | string;
    activo: boolean;
}

interface UsuariosListProps {
    usuarios?: Usuario[];
    onEdit: (usuario: Usuario) => void;
    onDelete: (usuario: Usuario) => void;
    search: string;
    onSearch: (value: string) => void;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    onSort: (column: string) => void;
}

const UsuariosList: React.FC<UsuariosListProps> = ({
    usuarios = [],
    onEdit,
    onDelete,
    search,
    onSearch,
    sortBy,
    sortOrder,
    onSort
}) => {
    return (
        <div className="mb-4">
            <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
                <div className="relative w-full md:w-80">
                    <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={search}
                        onChange={e => onSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg shadow-sm text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            {['id', 'nombre', 'correo', 'rol', 'activo'].map(col => (
                                <th
                                    key={col}
                                    className="px-4 py-2 font-semibold text-center cursor-pointer select-none"
                                    onClick={() => onSort(col)}
                                >
                                    {col === 'nombre' ? 'Nombre Completo' :
                                     col === 'correo' ? 'Correo' :
                                     col === 'rol' ? 'Rol' :
                                     col === 'activo' ? 'Estado' : 'ID'}
                                    {sortBy === col && (
                                        <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                            ))}
                            <th className="px-4 py-2 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-500">No hay usuarios registrados.</td>
                            </tr>
                        ) : (
                            usuarios.map((usuario, index) => (
                                <tr
                                    key={usuario.id}
                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                                >
                                    <td className="px-4 py-2 text-center">{usuario.id}</td>
                                    <td className="px-4 py-2">{usuario.nombre_completo}</td>
                                    <td className="px-4 py-2">{usuario.correo}</td>
                                    <td className="px-4 py-2 text-center">{usuario.rol_id === 1 ? 'Administrador' : usuario.rol_id}</td>
                                    <td className="px-4 py-2 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${usuario.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {usuario.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => onEdit(usuario)} title="Editar usuario">
                                            <Pen size={16} />
                                        </Button>
                                        <Button className={`${!usuario.activo ? 'bg-green-300 text-green-700' : 'bg-red-100 text-red-700'}`} size="sm" onClick={() => onDelete(usuario)} title="Eliminar usuario">
                                            {!usuario.activo ? <ShieldCheck size={16} /> : <ShieldBan size={16} />}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsuariosList;
