import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { ProveedorModal } from "../componets/ProveedorModal"
import { Proveedor, deleteProveedor, getProveedores } from "../services/ProveedorService"

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | undefined>()
  const { toast } = useToast()

  const loadProveedores = async () => {
    try {
      const data = await getProveedores()
      setProveedores(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los proveedores",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadProveedores()
  }, [])

  const handleEdit = (proveedor: Proveedor) => {
    setSelectedProveedor(proveedor)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este proveedor?")) return

    try {
      await deleteProveedor(id)
      toast({
        title: "Proveedor eliminado",
        description: "El proveedor se ha eliminado correctamente",
      })
      loadProveedores()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el proveedor",
        variant: "destructive",
      })
    }
  }

  const filteredProveedores = proveedores.filter((proveedor) =>
    proveedor.nombre_comercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.email_contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.telefono_contacto.includes(searchTerm)
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Proveedores</h1>
        <Button onClick={() => {
          setSelectedProveedor(undefined)
          setIsModalOpen(true)
        }}>+ Nuevo Proveedor</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Proveedores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input 
              placeholder="Buscar proveedores..." 
              className="max-w-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="border rounded-lg">
            <div className="grid grid-cols-7 gap-4 p-4 bg-muted/50 font-medium">
              <div>ID</div>
              <div>Nombre Comercial</div>
              <div>Contacto</div>
              <div>Email</div>
              <div>Teléfono</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>
            
            <div className="divide-y">
              {filteredProveedores.map((proveedor) => (
                <div key={proveedor.id} className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50">
                  <div>{proveedor.id}</div>
                  <div>{proveedor.nombre_comercial}</div>
                  <div>{proveedor.contacto_principal}</div>
                  <div>{proveedor.email_contacto}</div>
                  <div>{proveedor.telefono_contacto}</div>
                  <div>{proveedor.activo ? "Activo" : "Inactivo"}</div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(proveedor)}>
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => proveedor.id && handleDelete(proveedor.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <ProveedorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadProveedores}
        proveedor={selectedProveedor}
      />
    </div>
  )
}
