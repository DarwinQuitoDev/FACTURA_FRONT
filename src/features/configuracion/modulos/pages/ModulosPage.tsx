import React, { useEffect, useState } from 'react';

// Services
import { getModulos, getModuloById, crearModulo, actualizarModulo, eliminarModulo } from '../services/ModulosService';
import { getSubmodulos, getSubmoduloById, crearSubmodulo, actualizarSubmodulo, eliminarSubmodulo } from '../services/SubmodulosService';

// Components
import ModuloCard from '@/features/configuracion/modulos/components/ModuloCard';
import ModuloModal from '@/features/configuracion/modulos/components/ModuloModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SubmoduloModal from '../components/SubmoduloModal';

const ModulosPage: React.FC = () => {
    const [modulos, setModulos] = useState<any[]>([]);
    const [submodulos, setSubmodulos] = useState<any[]>([]);
    const [showModuloModal, setShowModuloModal] = useState(false);
    const [moduloEdit, setModuloEdit] = useState<any | null>(null);
    const [submoduloEdit, setSubmoduloEdit] = useState<any | null>(null);
    const [showSubmoduloModal, setShowSubmoduloModal] = useState(false);
    const [submoduloModuloId, setSubmoduloModuloId] = useState<number | null>(null);


    // Cargar módulos y submódulos al iniciar
    const fetchData = async () => {
        try {
            const [modulosData, submodulosData] = await Promise.all([
                getModulos(),
                getSubmodulos(),
            ]);
            setModulos(modulosData);
            setSubmodulos(submodulosData);
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Crear o editar módulo
    const handleSaveModulo = async (data: { nombre: string; ruta?: string; icono?: string; estado?: boolean }) => {
        try {
            if (moduloEdit) {
                await actualizarModulo(moduloEdit.id, data);
            } else {
                await crearModulo(data);
            }
            setShowModuloModal(false);
            setModuloEdit(null);
            fetchData();
        } catch (error) {
            console.error('Error al guardar módulo:', error);
        }
    };

    // Eliminar módulo
    const handleDeleteModulo = async (id: number) => {
        try {
            await eliminarModulo(id);
            fetchData();
        } catch (error) {
            console.error('Error al eliminar módulo:', error);
        }
    };

    // Crear o editar submódulo
    const handleSaveSubmodulo = async (data: { modulo_id: number; nombre: string; ruta?: string; icono?: string; estado?: boolean }) => {
        try {
            if (submoduloEdit) {
                await actualizarSubmodulo(submoduloEdit.id, data);
            } else {
                await crearSubmodulo(data);
            }
            setShowSubmoduloModal(false);
            setSubmoduloEdit(null);
            setSubmoduloModuloId(null);
            fetchData();
        } catch (error) {
            console.error('Error al guardar submódulo:', error);
        }
    };

    // Eliminar submódulo
    const handleDeleteSubmodulo = async (id: number) => {
        try {
            await eliminarSubmodulo(id);
            fetchData();
        } catch (error) {
            console.error('Error al eliminar submódulo:', error);
        }
    };


    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestión de Módulos</h2>
                <Button variant="default" onClick={() => { setShowModuloModal(true); setModuloEdit(null); }}>
                    <Plus className="mr-2" />Crear Módulo
                </Button>
            </div>
            {modulos.map((modulo) => (
                <ModuloCard
                    key={modulo.id}
                    modulo={modulo}
                    submodulos={submodulos.filter((s) => s.modulo_id === modulo.id)}
                    onEditModulo={() => { setShowModuloModal(true); setModuloEdit(modulo); }}
                    onDeleteModulo={() => handleDeleteModulo(modulo.id)}
                    onAddSubmodulo={() => { setShowSubmoduloModal(true); setSubmoduloEdit(null); setSubmoduloModuloId(modulo.id); }}
                    onEditSubmodulo={(sub) => { setShowSubmoduloModal(true); setSubmoduloEdit(sub); setSubmoduloModuloId(modulo.id); }}
                    onDeleteSubmodulo={(subId) => handleDeleteSubmodulo(subId)}
                />
            ))}
            {showModuloModal && (
                <ModuloModal
                    modulo={moduloEdit}
                    onClose={() => { setShowModuloModal(false); setModuloEdit(null); }}
                    onSave={handleSaveModulo}
                />
            )}
            {showSubmoduloModal && (
                <SubmoduloModal
                    submodulo={submoduloEdit}
                    moduloId={submoduloModuloId ?? undefined}
                    onClose={() => { setShowSubmoduloModal(false); setSubmoduloEdit(null); setSubmoduloModuloId(null); }}
                    onSave={handleSaveSubmodulo}
                />
            )}
        </div>
    );
};

export default ModulosPage;
