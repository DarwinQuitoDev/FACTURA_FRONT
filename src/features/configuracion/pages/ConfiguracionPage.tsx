import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ConfiguracionPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Guardar Cambios
        </button>
      </div>

      <Tabs defaultValue="empresa" className="w-full">
        <TabsList>
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="facturacion">Facturación</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="sri">SRI</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="empresa">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Información General</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="razonSocial">Razón Social</Label>
                  <Input type="text" id="razonSocial" />
                </div>
                <div>
                  <Label htmlFor="ruc">RUC</Label>
                  <Input type="text" id="ruc" />
                </div>
                <div>
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input type="text" id="direccion" />
                </div>
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input type="tel" id="telefono" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Imagen Corporativa</h3>
              <div className="space-y-4">
                <div>
                  <Label>Logo</Label>
                  <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">
                      Arrastra y suelta tu logo aquí o
                      <button className="text-primary ml-1">selecciona un archivo</button>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="facturacion">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Configuración de Facturación</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="facturaAutomatica">Facturación Automática</Label>
                  <Switch id="facturaAutomatica" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="imprimirAutomatico">Imprimir Automáticamente</Label>
                  <Switch id="imprimirAutomatico" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enviarEmail">Enviar por Email</Label>
                  <Switch id="enviarEmail" />
                </div>
                <div>
                  <Label htmlFor="formatoImpresion">Formato de Impresión</Label>
                  <select id="formatoImpresion" className="w-full mt-1 p-2 border rounded-md">
                    <option value="a4">A4</option>
                    <option value="ticket">Ticket</option>
                    <option value="media">Media Página</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Numeración de Documentos</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="establecimiento">Establecimiento</Label>
                  <Input type="text" id="establecimiento" />
                </div>
                <div>
                  <Label htmlFor="puntoEmision">Punto de Emisión</Label>
                  <Input type="text" id="puntoEmision" />
                </div>
                <div>
                  <Label htmlFor="secuencialFactura">Secuencial Factura</Label>
                  <Input type="number" id="secuencialFactura" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documentos">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Plantillas de Documentos</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Factura</Label>
                  <div className="mt-2 border rounded-lg p-4">
                    <button className="text-primary">Personalizar Plantilla</button>
                  </div>
                </div>
                <div>
                  <Label>Nota de Crédito</Label>
                  <div className="mt-2 border rounded-lg p-4">
                    <button className="text-primary">Personalizar Plantilla</button>
                  </div>
                </div>
                <div>
                  <Label>Guía de Remisión</Label>
                  <div className="mt-2 border rounded-lg p-4">
                    <button className="text-primary">Personalizar Plantilla</button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sri">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Configuración SRI</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ambiente">Ambiente</Label>
                <select id="ambiente" className="w-full mt-1 p-2 border rounded-md">
                  <option value="pruebas">Pruebas</option>
                  <option value="produccion">Producción</option>
                </select>
              </div>
              <div>
                <Label htmlFor="certificado">Certificado Digital</Label>
                <Input type="file" id="certificado" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="claveCertificado">Clave del Certificado</Label>
                <Input type="password" id="claveCertificado" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sistema">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Preferencias del Sistema</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tema">Tema</Label>
                  <select id="tema" className="w-48 p-2 border rounded-md">
                    <option value="claro">Claro</option>
                    <option value="oscuro">Oscuro</option>
                    <option value="sistema">Sistema</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="idioma">Idioma</Label>
                  <select id="idioma" className="w-48 p-2 border rounded-md">
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notificaciones">Notificaciones</Label>
                  <Switch id="notificaciones" defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Copias de Seguridad</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="backupAutomatico">Backup Automático</Label>
                  <Switch id="backupAutomatico" />
                </div>
                <div>
                  <Label htmlFor="frecuenciaBackup">Frecuencia</Label>
                  <select id="frecuenciaBackup" className="w-full mt-1 p-2 border rounded-md">
                    <option value="diario">Diario</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensual">Mensual</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="ubicacionBackup">Ubicación</Label>
                  <Input type="text" id="ubicacionBackup" />
                </div>
                <button className="w-full mt-2 bg-secondary text-white px-4 py-2 rounded-md">
                  Realizar Backup Manual
                </button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
