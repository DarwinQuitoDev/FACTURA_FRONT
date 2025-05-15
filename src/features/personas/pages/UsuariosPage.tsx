import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function UsuariosPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <Button>+ Nuevo Usuario</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Buscar usuarios..." className="max-w-sm" />
          </div>
          
          <div className="border rounded-lg">
            <div className="grid grid-cols-6 gap-4 p-4 bg-muted/50 font-medium">
              <div>ID</div>
              <div>Nombre</div>
              <div>Email</div>
              <div>Rol</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>
            
            <div className="divide-y">
              <div className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-muted/50">
                <div>001</div>
                <div>Admin User</div>
                <div>admin@sistema.com</div>
                <div>
                  <Badge variant="secondary">Administrador</Badge>
                </div>
                <div>
                  <Badge>Activo</Badge>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Editar</Button>
                  <Button variant="outline" size="sm">Permisos</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
