import { Sparkles } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="max-w w-full mx-auto bg-white/80 dark:bg-black/60 rounded-2xl shadow-xl p-10 flex flex-col items-center">
      <Sparkles size={48} className="text-primary mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold mb-4 text-center">Bienvenido al Procesador Inteligente de Archivos</h1>
      <p className="text-xl text-muted-foreground text-center mb-8">
        Este sistema está pensado para <span className="font-semibold text-primary">automatizar la limpieza y conversión de archivos</span> en formatos <span className="font-mono">XML</span> o <span className="font-mono">CSV</span>.
        <br />Súbelo, relájate y recibe un archivo limpio y listo para usar, sin complicaciones ni datos basura.
      </p>
      <div className="w-full mb-8">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold mb-2">1</div>
            <div className="font-medium">Arrastra o selecciona tu archivo (.xml, .csv)</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">2</div>
            <div className="font-medium">El sistema limpia y transforma los datos por ti</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">3</div>
            <div className="font-medium">Descarga tu archivo limpio y utilizable</div>
          </div>
        </div>
      </div>
      <div className="bg-muted rounded-lg p-4 text-sm text-foreground/90 w-full text-center">
        <b>¿Para qué sirve?</b> Ideal para contadores, auditores, desarrolladores y cualquier persona que necesita <span className="font-semibold text-primary">obtener datos limpios de archivos complejos</span> en segundos.
        <br />
        <span className="italic text-muted-foreground">Deja el trabajo pesado a la máquina… y quédate con los datos que importan.</span>
      </div>
    </div>
  );
}
