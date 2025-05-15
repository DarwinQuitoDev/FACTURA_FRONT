import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MovimientosPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movimientos de Inventario</h1>
        <div className="space-x-2">
          <Button variant="outline">Transferencia</Button>
          <Button>+ Nuevo Movimiento</Button>
        </div>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="entradas">Entradas</TabsTrigger>
          <TabsTrigger value="salidas">Salidas</TabsTrigger>
          <TabsTrigger value="transferencias">Transferencias</TabsTrigger>
          <TabsTrigger value="ajustes">Ajustes</TabsTrigger>
        </TabsList>

        <TabsContent value="todos">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Lista de Movimientos</CardTitle>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Filtros</Button>
                  <Button variant="outline" size="sm">Exportar</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input placeholder="Buscar movimientos..." className="max-w-sm" />
              </div>
              
              <div className="border rounded-lg">
                <div className="grid grid-cols-7 gap-4 p-4 bg-muted/50 font-medium">
                  <div>Fecha</div>
                  <div>Tipo</div>
                  <div>Documento</div>
                  <div>Bodega</div>
                  <div>Cantidad</div>
                  <div>Estado</div>
                  <div>Acciones</div>
                </div>
                
                <div className="divide-y">
                  <div className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                    <div>2025-05-15</div>
                    <div>
                      <Badge>Entrada</Badge>
                    </div>
                    <div>OC-001</div>
                    <div>Bodega Principal</div>
                    <div>50 unidades</div>
                    <div>
                      <Badge>Completado</Badge>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Ver Detalles</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                    <div>2025-05-15</div>
                    <div>
                      <Badge variant="destructive">Salida</Badge>
                    </div>
                    <div>FAC-123</div>
                    <div>Bodega Principal</div>
                    <div>5 unidades</div>
                    <div>
                      <Badge>Completado</Badge>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Ver Detalles</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                    <div>2025-05-14</div>
                    <div>
                      <Badge variant="secondary">Transferencia</Badge>
                    </div>
                    <div>TRA-045</div>
                    <div>Bodega Principal → Sucursal</div>
                    <div>25 unidades</div>
                    <div>
                      <Badge variant="secondary">En Proceso</Badge>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Ver Detalles</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Los demás TabsContent serían similares pero con filtros específicos */}
      </Tabs>
    </div>
  )
}
