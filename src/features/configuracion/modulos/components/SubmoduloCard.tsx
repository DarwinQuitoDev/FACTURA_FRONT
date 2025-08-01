import React, { useState } from 'react';
import SubmoduloModal from '@/features/configuracion/modulos/components/SubmoduloModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pen, ShieldBan, ShieldCheck } from 'lucide-react';

const SubmoduloCard = ({ submodulo }: { submodulo: any }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <span className="font-medium">{submodulo.nombre}</span>
        <span className="ml-2 text-gray-400">{submodulo.ruta}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${submodulo.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submodulo.estado ? 'Activo' : 'Inactivo'}
                </span>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => setShowEditModal(true)}><Pen /></Button>
        <Button className={`${submodulo.estado ? 'bg-green-300 text-green-700' : 'bg-red-100 text-red-700'}`} size="sm">{submodulo.estado ? <ShieldCheck size={16} /> : <ShieldBan size={16} />}</Button>
      </div>
      {showEditModal && (
        <SubmoduloModal submodulo={submodulo} onClose={() => setShowEditModal(false)} />
      )}
    </div>
  );
};

export default SubmoduloCard;
