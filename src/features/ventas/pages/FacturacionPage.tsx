import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export default function FacturacionPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Facturación</h1>
        <div className="flex gap-2">
          <button className="bg-secondary text-white px-4 py-2 rounded-md">
            Vista Previa
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-md">
            Generar Factura
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cliente">Cliente</Label>
                <Select>
                  <option value="">Seleccionar Cliente</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="fecha">Fecha</Label>
                <Input type="date" id="fecha" />
              </div>
              <div>
                <Label htmlFor="formaPago">Forma de Pago</Label>
                <Select>
                  <option value="">Seleccionar Forma de Pago</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="plazo">Plazo</Label>
                <Input type="number" id="plazo" />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Detalle de Factura</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Producto</th>
                      <th className="text-right p-2">Cantidad</th>
                      <th className="text-right p-2">Precio</th>
                      <th className="text-right p-2">Subtotal</th>
                      <th className="text-center p-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Aquí irá el detalle de la factura */}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 border border-primary text-primary px-4 py-2 rounded-md">
                Agregar Producto
              </button>
            </div>
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Resumen</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (12%):</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Descuento:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>$0.00</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
