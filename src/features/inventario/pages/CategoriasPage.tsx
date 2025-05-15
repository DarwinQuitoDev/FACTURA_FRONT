import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function CategoriasPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
        <Button>+ Nueva Categoría</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input placeholder="Buscar categorías..." />
            </div>
            
            <div className="border rounded-lg">
              <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 font-medium">
                <div>Nombre</div>
                <div>Productos</div>
                <div>Estado</div>
                <div>Acciones</div>
              </div>
              
              <div className="divide-y">
                <div className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-muted/50">
                  <div>Electrónicos</div>
                  <div>
                    <Badge variant="secondary">24 productos</Badge>
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

        <Card>
          <CardHeader>
            <CardTitle>Jerarquía de Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <ul className="space-y-2">
                <li>
                  <div className="flex items-center justify-between py-2">
                    <span>Electrónicos</span>
                    <Badge>24</Badge>
                  </div>
                  <ul className="pl-4 space-y-2 border-l">
                    <li>
                      <div className="flex items-center justify-between py-2">
                        <span>Computadoras</span>
                        <Badge>12</Badge>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between py-2">
                        <span>Celulares</span>
                        <Badge>8</Badge>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between py-2">
                        <span>Accesorios</span>
                        <Badge>4</Badge>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
