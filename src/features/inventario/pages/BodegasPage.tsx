import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function BodegasPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Bodegas</h1>
        <Button>+ Nueva Bodega</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Lista de Bodegas */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Bodegas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input placeholder="Buscar bodegas..." className="max-w-sm" />
              </div>
              
              <div className="border rounded-lg">
                <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 font-medium">
                  <div>Nombre</div>
                  <div>Ubicación</div>
                  <div>Capacidad</div>
                  <div>Estado</div>
                  <div>Acciones</div>
                </div>
                
                <div className="divide-y">
                  <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/50">
                    <div>Bodega Principal</div>
                    <div>Quito, Ecuador</div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">75% ocupado</div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <Badge>Activo</Badge>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm">Ver</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen de Almacenamiento */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Almacenamiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Capacidad Total</span>
                    <span>10,000 m³</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>6,500 m³ utilizado</span>
                    <span>3,500 m³ disponible</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Distribución</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Productos Electrónicos</span>
                      <Badge variant="secondary">30%</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Línea Blanca</span>
                      <Badge variant="secondary">25%</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Accesorios</span>
                      <Badge variant="secondary">20%</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Otros</span>
                      <Badge variant="secondary">25%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
