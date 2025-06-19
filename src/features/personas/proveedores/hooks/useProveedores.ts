import { useState } from "react"
import { Proveedor, getProveedores, createProveedor, updateProveedor, deleteProveedor } from "../services/ProveedorService"
import { toast } from "@/components/ui/use-toast"

export function useProveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const loadProveedores = async () => {
    try {
      setIsLoading(true)
      const data = await getProveedores()
      setProveedores(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los proveedores",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const create = async (data: Omit<Proveedor, 'id'>) => {
    try {
      setIsLoading(true)
      await createProveedor(data)
      toast({ title: "Proveedor creado", description: "El proveedor se ha creado correctamente" })
      await loadProveedores()
      return true
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el proveedor",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const update = async (id: number, data: Partial<Proveedor>) => {
    try {
      setIsLoading(true)
      await updateProveedor(id, data)
      toast({ title: "Proveedor actualizado", description: "El proveedor se ha actualizado correctamente" })
      await loadProveedores()
      return true
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el proveedor",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const remove = async (id: number) => {
    try {
      setIsLoading(true)
      await deleteProveedor(id)
      toast({ title: "Proveedor eliminado", description: "El proveedor se ha eliminado correctamente" })
      await loadProveedores()
      return true
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el proveedor",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    proveedores,
    selectedProveedor,
    isLoading,
    setSelectedProveedor,
    loadProveedores,
    create,
    update,
    remove,
  }
}
