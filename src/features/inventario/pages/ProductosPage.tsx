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

export default function ProductosPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <div className="space-x-2">
          <Button variant="outline">Importar</Button>
          <Button>+ Nuevo Producto</Button>
        </div>
      </div>

      <Tabs defaultValue="lista" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lista">Lista de Productos</TabsTrigger>
          <TabsTrigger value="precios">Precios</TabsTrigger>
          <TabsTrigger value="codigos">Códigos de Barras</TabsTrigger>
        </TabsList>

        <TabsContent value="lista">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between mb-4">
                <Input placeholder="Buscar productos..." className="max-w-sm" />
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Filtros</Button>
                  <Button variant="outline" size="sm">Exportar</Button>
                </div>
              </div>
              
              <div className="border rounded-lg">
                <div className="grid grid-cols-7 gap-4 p-4 bg-muted/50 font-medium">
                  <div>Código</div>
                  <div>Nombre</div>
                  <div>Categoría</div>
                  <div>Stock</div>
                  <div>Precio</div>
                  <div>Estado</div>
                  <div>Acciones</div>
                </div>
                
                <div className="divide-y">
                  <div className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                    <div>PRD001</div>
                    <div>Producto Demo</div>
                    <div>General</div>
                    <div>
                      <Badge variant="secondary">50 unidades</Badge>
                    </div>
                    <div>$99.99</div>
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
        </TabsContent>

        <TabsContent value="precios">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Precios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 font-medium">
                  <div>Producto</div>
                  <div>Precio Base</div>
                  <div>Precio Mayoreo</div>
                  <div>Último Cambio</div>
                  <div>Acciones</div>
                </div>
                
                <div className="divide-y">
                  <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/50">
                    <div>Producto Demo</div>
                    <div>$99.99</div>
                    <div>$89.99</div>
                    <div>2025-05-14</div>
                    <div>
                      <Button variant="outline" size="sm">Actualizar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="codigos">
          <Card>
            <CardHeader>
              <CardTitle>Códigos de Barras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 font-medium">
                  <div>Producto</div>
                  <div>Código Principal</div>
                  <div>Códigos Adicionales</div>
                  <div>Acciones</div>
                </div>
                
                <div className="divide-y">
                  <div className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-muted/50">
                    <div>Producto Demo</div>
                    <div>7890000000123</div>
                    <div>
                      <Badge variant="secondary" className="mr-1">7890000000456</Badge>
                      <Badge variant="secondary">7890000000789</Badge>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Gestionar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
