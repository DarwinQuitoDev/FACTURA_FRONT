import { useState } from "react"
import { Cliente, ClienteService, CreateClienteDto } from "../services/ClienteService"
import { toast } from "@/components/ui/use-toast"

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const loadClientes = async () => {
    try {
      setIsLoading(true)
      const data = await ClienteService.getAll()
      if (data) {
        setClientes(data)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los clientes",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al cargar los clientes",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createCliente = async (data: CreateClienteDto) => {
    try {
      setIsLoading(true)
      const result = await ClienteService.create(data)
      if (result) {
        toast({
          title: "Éxito",
          description: "Cliente creado correctamente",
        })
        await loadClientes()
        return true
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el cliente",
      })
      return false
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al crear el cliente",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const updateCliente = async (id: number, data: CreateClienteDto) => {
    try {
      setIsLoading(true)
      const result = await ClienteService.update(id, data)
      if (result) {
        toast({
          title: "Éxito",
          description: "Cliente actualizado correctamente",
        })
        await loadClientes()
        return true
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el cliente",
      })
      return false
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al actualizar el cliente",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCliente = async (id: number) => {
    try {
      setIsLoading(true)
      const result = await ClienteService.delete(id)
      if (result) {
        toast({
          title: "Éxito",
          description: "Cliente eliminado correctamente",
        })
        await loadClientes()
        return true
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el cliente",
      })
      return false
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al eliminar el cliente",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    clientes,
    selectedCliente,
    isLoading,
    setSelectedCliente,
    loadClientes,
    createCliente,
    updateCliente,
    deleteCliente,
  }
}
