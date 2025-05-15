import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function CuentasCobrarPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cuentas por Cobrar</h1>
        <div className="flex gap-2">
          <Input 
            type="text" 
            placeholder="Buscar cliente..." 
            className="w-64"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md">
            Nuevo Cobro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Por Cobrar Total</h3>
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
          <h3 className="font-semibold mb-2">Cobrado este Mes</h3>
          <p className="text-2xl text-green-600">$0.00</p>
        </Card>
      </div>

      <Tabs defaultValue="pendientes" className="w-full">
        <TabsList>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="vencidas">Vencidas</TabsTrigger>
          <TabsTrigger value="historial">Historial de Cobros</TabsTrigger>
        </TabsList>

        <TabsContent value="pendientes">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Factura</th>
                    <th className="text-left p-2">Cliente</th>
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
                    <th className="text-left p-2">Factura</th>
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Días Vencida</th>
                    <th className="text-right p-2">Valor Original</th>
                    <th className="text-right p-2">Intereses</th>
                    <th className="text-right p-2">Total a Cobrar</th>
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
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Factura</th>
                    <th className="text-right p-2">Valor</th>
                    <th className="text-left p-2">Forma de Pago</th>
                    <th className="text-left p-2">Referencia</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irá el historial de cobros */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
