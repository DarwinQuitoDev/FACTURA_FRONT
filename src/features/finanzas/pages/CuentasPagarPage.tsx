import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function CuentasPagarPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cuentas por Pagar</h1>
        <div className="flex gap-2">
          <Input 
            type="text" 
            placeholder="Buscar proveedor..." 
            className="w-64"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md">
            Nuevo Pago
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Por Pagar Total</h3>
          <p className="text-2xl text-red-600">$0.00</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Vencidas</h3>
          <p className="text-2xl text-yellow-600">$0.00</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Por Vencer</h3>
          <p className="text-2xl text-blue-600">$0.00</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Pagado este Mes</h3>
          <p className="text-2xl text-green-600">$0.00</p>
        </Card>
      </div>

      <Tabs defaultValue="pendientes" className="w-full">
        <TabsList>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="vencidas">Vencidas</TabsTrigger>
          <TabsTrigger value="historial">Historial de Pagos</TabsTrigger>
          <TabsTrigger value="programacion">Programación</TabsTrigger>
        </TabsList>

        <TabsContent value="pendientes">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Documento</th>
                    <th className="text-left p-2">Proveedor</th>
                    <th className="text-left p-2">Fecha Emisión</th>
                    <th className="text-left p-2">Fecha Vencimiento</th>
                    <th className="text-right p-2">Valor</th>
                    <th className="text-right p-2">Abonado</th>
                    <th className="text-right p-2">Saldo</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irá el listado de cuentas pendientes */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="vencidas">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Documento</th>
                    <th className="text-left p-2">Proveedor</th>
                    <th className="text-left p-2">Días Vencida</th>
                    <th className="text-right p-2">Valor Original</th>
                    <th className="text-right p-2">Intereses</th>
                    <th className="text-right p-2">Total a Pagar</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irá el listado de cuentas vencidas */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Fecha</th>
                    <th className="text-left p-2">Proveedor</th>
                    <th className="text-left p-2">Documento</th>
                    <th className="text-right p-2">Valor</th>
                    <th className="text-left p-2">Forma de Pago</th>
                    <th className="text-left p-2">Referencia</th>
                    <th className="text-center p-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irá el historial de pagos */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="programacion">
          <Card className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-4">Pagos Programados</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Fecha</th>
                        <th className="text-left p-2">Proveedor</th>
                        <th className="text-right p-2">Monto</th>
                        <th className="text-center p-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Aquí irán los pagos programados */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Calendario de Pagos</h3>
                {/* Aquí irá el calendario de pagos */}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
