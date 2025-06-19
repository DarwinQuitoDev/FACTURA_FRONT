import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Cliente } from "../services/ClienteService"
import { ActionButtons } from "@/components/ui/action-buttons"
import { formatCurrency } from "@/lib/utils"

interface ClientesTableProps {
  clientes: Cliente[]
  onEdit: (cliente: Cliente) => void
  onDelete: (id: number) => void
  onView: (id: number) => void
}

export function ClientesTable({ clientes, onEdit, onDelete, onView }: ClientesTableProps) {
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
      accessorKey: "numero_identificacion",
      header: "RUC/CI",
    },
    {
      accessorKey: "telefono",
      header: "Teléfono",
    },
    {
      accessorKey: "correo_electronico",
      header: "Correo",
    },
    {
      accessorKey: "totalVentas",
      header: "Total Ventas",
      cell: ({ row }) => {
        const total = row.getValue("totalVentas") as number
        return formatCurrency(total || 0)
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const cliente = row.original
        return (
          <ActionButtons
            onEdit={() => onEdit(cliente)}
            onDelete={() => onDelete(cliente.id)}
            onView={() => onView(cliente.id)}
          />
        )
      },
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={clientes}
      searchPlaceholder="Buscar por nombre o identificación..."
    />
  )
}
