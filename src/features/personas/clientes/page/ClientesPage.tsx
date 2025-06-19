import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { ClienteModal } from "../componets/ClienteModal"
import { ClientesTable } from "../components/ClientesTable"
import { useClientes } from "../hooks/useClientes"
import { CreateClienteDto } from "../services/ClienteService"

export default function ClientesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const {
    clientes,
    selectedCliente,
    isLoading,
    setSelectedCliente,
    loadClientes,
    createCliente,
    updateCliente,
    deleteCliente,
  } = useClientes()

  useEffect(() => {
    loadClientes()
  }, [])

  const handleCreateCliente = async (data: CreateClienteDto) => {
    const success = await createCliente(data)
    if (success) {
      setIsModalOpen(false)
    }
  }

  const handleUpdateCliente = async (data: CreateClienteDto) => {
    if (!selectedCliente) return

    const success = await updateCliente(selectedCliente.id, data)
    if (success) {
      setIsModalOpen(false)
      setSelectedCliente(undefined)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
        <Button
          onClick={() => {
            setSelectedCliente(undefined)
            setIsModalOpen(true)
          }}
        >
          + Nuevo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Lista de Clientes
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ClientesTable
            clientes={clientes}
            onEdit={(cliente) => {
              setSelectedCliente(cliente)
              setIsModalOpen(true)
            }}
            onDelete={deleteCliente}
            onView={(clienteId) => navigate(`/ventas?clienteId=${clienteId}`)}
          />
        </CardContent>
      </Card>

      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCliente(undefined)
        }}
        onSubmit={selectedCliente ? handleUpdateCliente : handleCreateCliente}
        cliente={selectedCliente}
        title={selectedCliente ? "Editar Cliente" : "Nuevo Cliente"}
      />
    </div>
  )
}
