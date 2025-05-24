import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ClienteModal } from "../componets/ClienteModal"
import { Cliente, ClienteService, CreateClienteDto } from "../services/ClienteService"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, Loader2, Pencil, Trash2 } from "lucide-react"

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const loadClientes = async () => {
    try {
      setIsLoading(true)
      const data = await ClienteService.getAll()
      setClientes(data)
    } catch (error) {
      console.error("Error al cargar los clientes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadClientes()
  }, [])

  const handleCreateCliente = async (data: CreateClienteDto) => {
    try {
      await ClienteService.create(data)
      loadClientes()
    } catch (error) {
      console.error("Error al crear el cliente:", error)
    }
  }

  const handleUpdateCliente = async (data: CreateClienteDto) => {
    if (!selectedCliente) return

    try {
      await ClienteService.update(selectedCliente.id, data)
      loadClientes()
    } catch (error) {
      console.error("Error al actualizar el cliente")
    }
  }

  const handleDeleteCliente = async (id: number) => {
    try {
      await ClienteService.delete(id)
      loadClientes()
    } catch (error) {
      console.error("Error al eliminar el cliente:", error)
    }
  }

  const columns: ColumnDef<Cliente>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorFn: (row: Cliente) => `${row.nombres} ${row.apellidos}`,
      header: "Nombre completo",
    },
    {
      accessorKey: "identificacion",
      header: "RUC/CI",
    },
    {
      accessorKey: "telefono",
      header: "Teléfono",
    },
    {
      accessorKey: "email",
      header: "Correo",
    },
    {
      accessorKey: "totalVentas",
      header: "Total Ventas",
      cell: ({ row }: { row: any }) => {
        const total = row.getValue("totalVentas") as number
        return new Intl.NumberFormat("es-EC", {
          style: "currency",
          currency: "USD",
        }).format(total || 0)
      },
    },
    {
      id: "actions",
      cell: ({ row }: { row: any }) => {
        const cliente = row.original
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSelectedCliente(cliente)
                setIsModalOpen(true)
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDeleteCliente(cliente.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/ventas?clienteId=${cliente.id}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
        <Button onClick={() => {
          setSelectedCliente(undefined)
          setIsModalOpen(true)
        }}>
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
          <DataTable
            columns={columns}
            data={clientes}
            searchPlaceholder="Buscar por nombre o identificación..."
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
