import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function RolesPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Roles</h1>
        <Button>+ Nuevo Rol</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input placeholder="Buscar roles..." />
            </div>
            
            <div className="border rounded-lg">
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 font-medium">
                <div>Nombre</div>
                <div>Usuarios</div>
                <div>Acciones</div>
              </div>
              
              <div className="divide-y">
                <div className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-muted/50">
                  <div>Administrador</div>
                  <div>
                    <Badge variant="secondary">3 usuarios</Badge>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permisos del Rol</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Módulo Ventas</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-1" />
                    <label htmlFor="perm-1">Ver facturas</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-2" />
                    <label htmlFor="perm-2">Crear facturas</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-3" />
                    <label htmlFor="perm-3">Anular facturas</label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Módulo Inventario</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-4" />
                    <label htmlFor="perm-4">Ver productos</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-5" />
                    <label htmlFor="perm-5">Gestionar stock</label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
