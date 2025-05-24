import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ProveedoresPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Proveedores</h1>
        <Button>+ Nuevo Proveedor</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Proveedores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Buscar proveedores..." className="max-w-sm" />
          </div>
          
          <div className="border rounded-lg">
            <div className="grid grid-cols-6 gap-4 p-4 bg-muted/50 font-medium">
              <div>ID</div>
              <div>Razón Social</div>
              <div>RUC</div>
              <div>Email</div>
              <div>Teléfono</div>
              <div>Acciones</div>
            </div>
            
            {/* Placeholder for provider rows */}
            <div className="divide-y">
              <div className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-muted/50">
                <div>001</div>
                <div>Suministros XYZ S.A.</div>
                <div>9876543210001</div>
                <div>info@xyz.com</div>
                <div>+593 2 234 5678</div>
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
  )
}
