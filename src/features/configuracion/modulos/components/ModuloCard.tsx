import React, { useState } from 'react';
import SubmoduloCard from '@/features/configuracion/modulos/components/SubmoduloCard';
import SubmoduloModal from '@/features/configuracion/modulos/components/SubmoduloModal';
import ModuloModal from '@/features/configuracion/modulos/components/ModuloModal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Pen, PlusCircle, ShieldBan, ShieldCheck, Trash2 } from 'lucide-react';

interface ModuloCardProps {
  modulo: any;
  submodulos: any[];
  onEditModulo: () => void;
  onDeleteModulo: () => void;
  onAddSubmodulo: () => void;
  onEditSubmodulo: (sub: any) => void;
  onDeleteSubmodulo: (subId: number) => void;
}

const ModuloCard: React.FC<ModuloCardProps> = ({
  modulo,
  submodulos,
  onEditModulo,
  onDeleteModulo,
  onAddSubmodulo,
  onEditSubmodulo,
  onDeleteSubmodulo,
}) => {
  return (
    <Card className="mb-4 p-4 shadow">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold text-lg">{modulo.nombre}</span>
          <span className="ml-2 text-gray-500">{modulo.ruta}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${modulo.estado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {modulo.estado ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={onEditModulo}><Pen/></Button>
          <Button className={`${modulo.estado ? 'bg-green-300 text-green-700' : 'bg-red-100 text-red-700'}`} size="sm" onClick={onDeleteModulo} >{!modulo.estado ? <ShieldCheck size={16} /> : <ShieldBan size={16} />}</Button>
          <Button variant="warning" size="sm" onClick={onAddSubmodulo}><PlusCircle/></Button>
        </div>
      </div>
      <div className="mt-2 ml-4">
        {submodulos.map((sub) => (
          <SubmoduloCard
            key={sub.id}
            submodulo={sub}
            onEdit={() => onEditSubmodulo(sub)}
            onDelete={() => onDeleteSubmodulo(sub.id)}
          />
        ))}
      </div>
    </Card>
  );
};

export default ModuloCard;
