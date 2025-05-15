import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function FormasPagoPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Formas de Pago</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Nueva Forma de Pago
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-center p-2">Días de Crédito</th>
                    <th className="text-center p-2">Requiere Ref.</th>
                    <th className="text-center p-2">Estado</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">Efectivo</td>
                    <td className="p-2">Pago Inmediato</td>
                    <td className="text-center p-2">0</td>
                    <td className="text-center p-2">No</td>
                    <td className="text-center p-2">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                        Activo
                      </span>
                    </td>
                    <td className="text-center p-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        Editar
                      </button>
                    </td>
                  </tr>
                  {/* Aquí irán más formas de pago */}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Detalles de Forma de Pago</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input type="text" id="nombre" placeholder="Nombre de la forma de pago" />
            </div>
            
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <select id="tipo" className="w-full mt-1 p-2 border rounded-md">
                <option value="">Seleccionar tipo</option>
                <option value="inmediato">Pago Inmediato</option>
                <option value="credito">Crédito</option>
                <option value="electronico">Pago Electrónico</option>
                <option value="diferido">Pago Diferido</option>
              </select>
            </div>

            <div>
              <Label htmlFor="diasCredito">Días de Crédito</Label>
              <Input type="number" id="diasCredito" min="0" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="requiereReferencia">Requiere Referencia</Label>
              <Switch id="requiereReferencia" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="estado">Activo</Label>
              <Switch id="estado" defaultChecked />
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <textarea
                id="descripcion"
                className="w-full mt-1 p-2 border rounded-md"
                rows={3}
                placeholder="Descripción de la forma de pago"
              ></textarea>
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button className="px-4 py-2 border rounded-md">
                Cancelar
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-md">
                Guardar
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
