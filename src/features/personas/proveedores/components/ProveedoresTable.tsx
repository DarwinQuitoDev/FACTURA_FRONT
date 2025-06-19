import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Proveedor } from "../services/ProveedorService"
import { ActionButtons } from "@/components/ui/action-buttons"

interface ProveedoresTableProps {
  proveedores: Proveedor[]
  onEdit: (proveedor: Proveedor) => void
  onDelete: (id: number) => void
  searchTerm: string
  onSearch: (term: string) => void
}

export function ProveedoresTable({ proveedores, onEdit, onDelete, searchTerm, onSearch }: ProveedoresTableProps) {
  const columns: ColumnDef<Proveedor>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nombre_comercial", header: "Nombre Comercial" },
    { accessorKey: "contacto_principal", header: "Contacto" },
    { accessorKey: "email_contacto", header: "Email" },
    { accessorKey: "telefono_contacto", header: "Teléfono" },
    { accessorKey: "activo", header: "Estado", cell: ({ row }) => row.original.activo ? "Activo" : "Inactivo" },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionButtons
          onEdit={() => onEdit(row.original)}
          onDelete={() => onDelete(row.original.id!)}
          hideView
        />
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={proveedores}
      searchPlaceholder="Buscar proveedores..."
      searchValue={searchTerm}
      onSearchChange={onSearch}
    />
  )
}
