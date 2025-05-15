import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VentasPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ventas</h1>
        <div className="flex gap-2">
          <Input 
            type="text" 
            placeholder="Buscar venta..."
            className="w-64"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md">
            Nueva Venta
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Ventas Hoy</h3>
          <p className="text-2xl text-green-600">$0.00</p>
          <p className="text-sm text-gray-500">0 transacciones</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Ventas Semana</h3>
          <p className="text-2xl text-blue-600">$0.00</p>
          <p className="text-sm text-gray-500">0 transacciones</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Ventas Mes</h3>
          <p className="text-2xl text-purple-600">$0.00</p>
          <p className="text-sm text-gray-500">0 transacciones</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Pendientes</h3>
          <p className="text-2xl text-yellow-600">0</p>
          <p className="text-sm text-gray-500">Por aprobar</p>
        </Card>
      </div>

      <Tabs defaultValue="ventas" className="w-full">
        <TabsList>
          <TabsTrigger value="ventas">Lista de Ventas</TabsTrigger>
          <TabsTrigger value="facturas">Facturas</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="ventas">
          <Card className="p-4">
            <div className="flex justify-between mb-4">
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="completadas">Completadas</SelectItem>
                    <SelectItem value="pendientes">Pendientes</SelectItem>
                    <SelectItem value="anuladas">Anuladas</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoy">Hoy</SelectItem>
                    <SelectItem value="semana">Esta Semana</SelectItem>
                    <SelectItem value="mes">Este Mes</SelectItem>
                    <SelectItem value="año">Este Año</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border rounded-md">
                  Exportar
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">N° Factura</th>
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Fecha</th>
                    <th className="text-right p-2">Subtotal</th>
                    <th className="text-right p-2">IVA</th>
                    <th className="text-right p-2">Total</th>
                    <th className="text-center p-2">Estado</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irán las filas de ventas */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="facturas">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">N° Factura</th>
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Fecha Emisión</th>
                    <th className="text-right p-2">Total</th>
                    <th className="text-center p-2">Estado SRI</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irán las filas de facturas */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Ventas por Categoría</h3>
              <div className="h-64">
                {/* Aquí irá el gráfico de ventas por categoría */}
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Tendencia de Ventas</h3>
              <div className="h-64">
                {/* Aquí irá el gráfico de tendencia */}
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Top Productos</h3>
              <div className="space-y-2">
                {/* Aquí irá la lista de productos más vendidos */}
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Top Clientes</h3>
              <div className="space-y-2">
                {/* Aquí irá la lista de mejores clientes */}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}