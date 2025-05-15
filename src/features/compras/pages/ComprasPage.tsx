import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ComprasPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Compras</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Nueva Compra
        </button>
      </div>

      <Tabs defaultValue="resumen" className="w-full">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="compras">Lista de Compras</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Compras del Mes</h3>
              <p className="text-2xl">$0.00</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Órdenes Pendientes</h3>
              <p className="text-2xl">0</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Proveedores Activos</h3>
              <p className="text-2xl">0</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compras">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">N° Compra</th>
                    <th className="text-left p-2">Proveedor</th>
                    <th className="text-left p-2">Fecha</th>
                    <th className="text-right p-2">Total</th>
                    <th className="text-center p-2">Estado</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irá el listado de compras */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas">
          <Card className="p-4">
            <h3 className="text-xl mb-4">Estadísticas de Compras</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Compras por Proveedor</h4>
                {/* Aquí irá el gráfico de compras por proveedor */}
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Compras por Categoría</h4>
                {/* Aquí irá el gráfico de compras por categoría */}
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
