import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function DocumentosElectronicosPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Documentos Electrónicos</h1>
        <div className="flex gap-2">
          <Input 
            type="text" 
            placeholder="Buscar documento..." 
            className="w-64"
          />
        </div>
      </div>

      <Tabs defaultValue="facturas" className="w-full">
        <TabsList>
          <TabsTrigger value="facturas">Facturas</TabsTrigger>
          <TabsTrigger value="notas-credito">Notas de Crédito</TabsTrigger>
          <TabsTrigger value="retenciones">Retenciones</TabsTrigger>
          <TabsTrigger value="guias-remision">Guías de Remisión</TabsTrigger>
        </TabsList>

        <TabsContent value="facturas">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">N° Documento</th>
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Fecha</th>
                    <th className="text-right p-2">Total</th>
                    <th className="text-center p-2">Estado SRI</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irá el listado de facturas electrónicas */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notas-credito">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">N° Documento</th>
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Factura Ref.</th>
                    <th className="text-right p-2">Total</th>
                    <th className="text-center p-2">Estado SRI</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irá el listado de notas de crédito */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="retenciones">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">N° Documento</th>
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Factura Ref.</th>
                    <th className="text-right p-2">Total</th>
                    <th className="text-center p-2">Estado SRI</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irá el listado de retenciones */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="guias-remision">
          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">N° Documento</th>
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Destino</th>
                    <th className="text-left p-2">Transportista</th>
                    <th className="text-center p-2">Estado SRI</th>
                    <th className="text-center p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irá el listado de guías de remisión */}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
