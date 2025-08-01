import React, { useEffect, useState } from 'react';

// Services
import { getModulos, getModuloById, crearModulo, actualizarModulo, eliminarModulo } from '../services/ModulosService';
import { getSubmodulos, getSubmoduloById, crearSubmodulo, actualizarSubmodulo, eliminarSubmodulo } from '../services/SubmodulosService';

// Components
import ModuloCard from '@/features/configuracion/modulos/components/ModuloCard';
import ModuloModal from '@/features/configuracion/modulos/components/ModuloModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const ModulosPage: React.FC = () => {
    const [modulos, setModulos] = useState<any[]>([]);
    const [submodulos, setSubmodulos] = useState<any[]>([]);
    const [showModuloModal, setShowModuloModal] = useState(false);


    // Cargar módulos y submódulos al iniciar
    useEffect(() => {
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

        fetchData();
    }, []);


    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestión de Módulos</h2>
                <Button variant="default" onClick={() => setShowModuloModal(true)}>
                    <Plus className="mr-2" />Crear Módulo
                </Button>
            </div>
            {modulos.map((modulo) => (
                <ModuloCard
                    key={modulo.id}
                    modulo={modulo}
                    submodulos={submodulos.filter((s) => s.modulo_id === modulo.id)}
                />
            ))}
            {showModuloModal && (
                <ModuloModal onClose={() => setShowModuloModal(false)} />
            )}
        </div>
    );
};

export default ModulosPage;
