import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { EmpresaService, type Empresa } from "../services/EmpresaService";
import { showNotification } from "@/utils/notifications.utils";
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  ImagePlus,
  Save,
  Building,
  CircleDollarSign,
  User2
} from "lucide-react";

const EmpresaComponent = () => {
  const [empresa, setEmpresa] = useState<Empresa>({
    ruc: "",
    razon_social: "",
    nombre_comercial: "",
    direccion_matriz: "",
    telefono: "",
    email: "",
    website: "",
    fecha_inicio_actividades: "",
    obligado_contabilidad: false,
    lleva_contabilidad: false,
    agente_retencion: false,
    contribuyente_especial: false,
    resolucion_contribuyente: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmpresa();
  }, []);
  const loadEmpresa = async () => {
    try {
      setLoading(true);
      const empresaData = await EmpresaService.getById(1); // Siempre cargamos la empresa con ID 1
      if (empresaData) {
        setEmpresa(empresaData);
      }
    } catch (error) {
      showNotification("Error al cargar la información de la empresa", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (empresa.id) {
        await EmpresaService.update(empresa.id, empresa);
        showNotification("Empresa actualizada exitosamente", "success");
      } else {
        await EmpresaService.create(empresa);
        showNotification("Empresa creada exitosamente", "success");
      }
      await loadEmpresa(); // Recargar datos
    } catch (error) {
      showNotification("Error al guardar los cambios", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresa((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setEmpresa((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <TabsContent value="empresa" className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Información de la Empresa</h2>
          <p className="text-muted-foreground">
            Gestione la información general y configuración de su empresa
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          <Save className="w-4 h-4" />
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información General */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Información General</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ruc" className="flex items-center gap-2">
                  <CircleDollarSign className="w-4 h-4 text-muted-foreground" />
                  RUC
                </Label>
                <Input
                  type="text"
                  id="ruc"
                  name="ruc"
                  value={empresa.ruc}
                  onChange={handleInputChange}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="razonSocial" className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  Razón Social
                </Label>
                <Input
                  type="text"
                  id="razonSocial"
                  name="razon_social"
                  value={empresa.razon_social}
                  onChange={handleInputChange}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombreComercial" className="flex items-center gap-2">
                <User2 className="w-4 h-4 text-muted-foreground" />
                Nombre Comercial
              </Label>
              <Input
                type="text"
                id="nombreComercial"
                name="nombre_comercial"
                value={empresa.nombre_comercial}
                onChange={handleInputChange}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion" className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                Dirección Matriz
              </Label>
              <Input
                type="text"
                id="direccion"
                name="direccion_matriz"
                value={empresa.direccion_matriz}
                onChange={handleInputChange}
                className="bg-background"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefono" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Teléfono
                </Label>
                <Input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={empresa.telefono}
                  onChange={handleInputChange}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={empresa.email}
                  onChange={handleInputChange}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sitioWeb" className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  Sitio Web
                </Label>
                <Input
                  type="url"
                  id="sitioWeb"
                  name="website"
                  value={empresa.website}
                  onChange={handleInputChange}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaInicioActividad" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Inicio de Actividades
                </Label>
                <Input
                  type="date"
                  id="fechaInicioActividad"
                  name="fecha_inicio_actividades"
                  value={empresa.fecha_inicio_actividades}
                  onChange={handleInputChange}
                  className="bg-background"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Imagen y Configuración Fiscal */}
        <div className="space-y-6">
          {/* Logo */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ImagePlus className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Logo de la Empresa</h3>
            </div>
            <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <ImagePlus className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Arrastra y suelta tu logo aquí o
                </p>
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  selecciona un archivo
                </button>
              </div>
            </div>
          </Card>

          {/* Configuración Fiscal */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <CircleDollarSign className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Configuración Fiscal</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Checkbox
                  id="obligadoContabilidad"
                  checked={empresa.obligado_contabilidad}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("obligado_contabilidad", checked as boolean)
                  }
                />
                <Label htmlFor="obligadoContabilidad">
                  Obligado a llevar contabilidad
                </Label>
              </div>
              <div className="flex items-center space-x-2 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Checkbox
                  id="llevaContabilidad"
                  checked={empresa.lleva_contabilidad}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("lleva_contabilidad", checked as boolean)
                  }
                />
                <Label htmlFor="llevaContabilidad">Lleva contabilidad</Label>
              </div>
              <div className="flex items-center space-x-2 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Checkbox
                  id="agenteRetencion"
                  checked={empresa.agente_retencion}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("agente_retencion", checked as boolean)
                  }
                />
                <Label htmlFor="agenteRetencion">Agente de retención</Label>
              </div>
              <div className="flex items-center space-x-2 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Checkbox
                  id="contribuyenteEspecial"
                  checked={empresa.contribuyente_especial}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("contribuyente_especial", checked as boolean)
                  }
                />
                <Label htmlFor="contribuyenteEspecial">Contribuyente especial</Label>
              </div>

              {empresa.contribuyente_especial && (
                <div className="mt-4 space-y-2 pl-6">
                  <Label htmlFor="resolucionContribuyenteEspecial">
                    Resolución de Contribuyente Especial
                  </Label>
                  <Input
                    type="text"
                    id="resolucionContribuyenteEspecial"
                    name="resolucion_contribuyente"
                    value={empresa.resolucion_contribuyente}
                    onChange={handleInputChange}
                    className="bg-background"
                    placeholder="Ingrese el número de resolución"
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};

export default EmpresaComponent;
