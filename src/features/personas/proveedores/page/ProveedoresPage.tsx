import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { ProveedorModal } from "../componets/ProveedorModal"
import { useProveedores } from "../hooks/useProveedores"
import { ProveedoresTable } from "../components/ProveedoresTable"

export default function ProveedoresPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const {
    proveedores,
    selectedProveedor,
    isLoading,
    setSelectedProveedor,
    loadProveedores,
    create,
    update,
    remove,
  } = useProveedores()

  useEffect(() => {
    loadProveedores()
  }, [])

  const filteredProveedores = proveedores.filter((proveedor) =>
    proveedor.nombre_comercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.email_contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.telefono_contacto.includes(searchTerm)
  )

  const handleEdit = (proveedor: any) => {
    setSelectedProveedor(proveedor)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este proveedor?")) return
    await remove(id)
  }

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
          <CardTitle className="flex items-center gap-2">
            Lista de Proveedores
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
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
          <ProveedoresTable
            proveedores={filteredProveedores}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
        </CardContent>
      </Card>

      <ProveedorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProveedor(undefined)
        }}
        onSuccess={loadProveedores}
        proveedor={selectedProveedor}
      />
    </div>
  )
}
