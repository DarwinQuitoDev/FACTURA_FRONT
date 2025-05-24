import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Cliente, CreateClienteDto } from "../services/ClienteService"

const clienteSchema: z.ZodType<CreateClienteDto> = z.object({
  tipo_identificacion_id: z.number().min(1, "Seleccione un tipo de identificación"),
  numero_identificacion: z.string().min(10, "La identificación debe tener al menos 10 caracteres"),
  nombres: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellidos: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  direccion: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  telefono: z.string().min(7, "El teléfono debe tener al menos 7 caracteres"),
  celular: z.string().min(10, "El celular debe tener al menos 10 caracteres"),
  correo_electronico: z.string().email("El correo electrónico no es válido"),
  fecha_nacimiento: z.string().optional(),
  tipo_persona: z.union([z.literal("NATURAL"), z.literal("JURIDICA")]),
  estado_civil: z.union([
    z.literal("SOLTERO"),
    z.literal("CASADO"),
    z.literal("DIVORCIADO"),
    z.literal("VIUDO"),
    z.literal("UNION_LIBRE"),
  ]),
  genero: z.union([
    z.literal("MASCULINO"),
    z.literal("FEMENINO"),
    z.literal("OTRO"),
  ]),
  es_contribuyente: z.boolean(),
  obligatorio_contabilidad: z.boolean(),
  activo: z.boolean(),
})

interface ClienteModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateClienteDto) => void
  cliente?: Cliente
  title: string
}

export function ClienteModal({
  isOpen,
  onClose,
  onSubmit,
  cliente,
  title,
}: ClienteModalProps) {
  const form = useForm<CreateClienteDto>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      tipo_identificacion_id: 1,
      numero_identificacion: "",
      nombres: "",
      apellidos: "",
      direccion: "",
      telefono: "",
      celular: "",
      correo_electronico: "",
      fecha_nacimiento: "",
      tipo_persona: "NATURAL",
      estado_civil: "SOLTERO",
      genero: "MASCULINO",
      es_contribuyente: false,
      obligatorio_contabilidad: false,
      activo: true,
    },
  })

  // Use useEffect to update form values when cliente changes
  useEffect(() => {
    if (cliente) {
      const formData: CreateClienteDto = {
        tipo_identificacion_id: cliente.tipo_identificacion_id,
        numero_identificacion: cliente.numero_identificacion,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        celular: cliente.celular,
        correo_electronico: cliente.correo_electronico,
        fecha_nacimiento: cliente.fecha_nacimiento || "",
        tipo_persona: cliente.tipo_persona as "NATURAL" | "JURIDICA",
        estado_civil: cliente.estado_civil as "SOLTERO" | "CASADO" | "DIVORCIADO" | "VIUDO" | "UNION_LIBRE",
        genero: cliente.genero as "MASCULINO" | "FEMENINO" | "OTRO",
        es_contribuyente: cliente.es_contribuyente,
        obligatorio_contabilidad: cliente.obligatorio_contabilidad,
        activo: cliente.activo,
      }
      form.reset(formData)
    } else {
      form.reset({
        tipo_identificacion_id: 1,
        numero_identificacion: "",
        nombres: "",
        apellidos: "",
        direccion: "",
        telefono: "",
        celular: "",
        correo_electronico: "",
        fecha_nacimiento: "",
        tipo_persona: "NATURAL",
        estado_civil: "SOLTERO",
        genero: "MASCULINO",
        es_contribuyente: false,
        obligatorio_contabilidad: false,
        activo: true,
      })
    }
  }, [cliente, form])

  const handleSubmit = (data: CreateClienteDto) => {
    onSubmit(data)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]" aria-describedby="cliente-form-description">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField name="tipo_identificacion_id" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Identificación</FormLabel>
                  <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Cédula</SelectItem>
                      <SelectItem value="2">RUC</SelectItem>
                      <SelectItem value="3">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="numero_identificacion" render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Identificación</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="nombres" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="apellidos" render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder="Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="direccion" render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle Principal y Secundaria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="telefono" render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="022123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="celular" render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="0991234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="correo_electronico" render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="juan@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="fecha_nacimiento" render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="tipo_persona" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Persona</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NATURAL">Natural</SelectItem>
                      <SelectItem value="JURIDICA">Jurídica</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="estado_civil" render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Civil</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SOLTERO">Soltero/a</SelectItem>
                      <SelectItem value="CASADO">Casado/a</SelectItem>
                      <SelectItem value="DIVORCIADO">Divorciado/a</SelectItem>
                      <SelectItem value="VIUDO">Viudo/a</SelectItem>
                      <SelectItem value="UNION_LIBRE">Unión Libre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="genero" render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione género" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MASCULINO">Masculino</SelectItem>
                      <SelectItem value="FEMENINO">Femenino</SelectItem>
                      <SelectItem value="OTRO">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="col-span-2 space-y-4">
                <FormField name="es_contribuyente" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Es contribuyente especial</FormLabel>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="obligatorio_contabilidad" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Obligado a llevar contabilidad</FormLabel>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="activo" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Cliente activo</FormLabel>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}