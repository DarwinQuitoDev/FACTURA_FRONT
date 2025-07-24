import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type TipoArchivo = 'peps' | 'autoridades' | 'observados' | 'ofac' | 'onu';

const EXTENSIONES_MIME: Record<TipoArchivo, { ext: string, mime: string[] }> = {
    peps: { ext: 'csv', mime: ['text/csv', 'application/vnd.ms-excel'] },
    autoridades: { ext: 'csv', mime: ['text/csv', 'application/vnd.ms-excel'] },
    observados: { ext: 'csv', mime: ['text/csv', 'application/vnd.ms-excel'] },
    ofac: { ext: 'xml', mime: ['application/xml', 'text/xml'] },
    onu: { ext: 'xml', mime: ['application/xml', 'text/xml'] }
};

export default function Peps() {
    const [archivo, setArchivo] = useState<File | null>(null);
    const [tipo, setTipo] = useState<TipoArchivo | ''>('');
    const [cargando, setCargando] = useState(false);

    const handleFileSelect = (file: File, tipoSeleccionado: TipoArchivo) => {
        if (!file) return;

        const extension = file.name.split('.').pop()?.toLowerCase();
        const { ext: extEsperada, mime: mimesPermitidos } = EXTENSIONES_MIME[tipoSeleccionado];

        const tipoMimeValido = mimesPermitidos.includes(file.type);
        const extensionValida = extension === extEsperada;

        if (!extensionValida || !tipoMimeValido) {
            toast.error(`❌ El archivo debe ser .${extEsperada} y del tipo MIME válido (${mimesPermitidos.join(', ')})`);
            return;
        }

        setArchivo(file);
        setTipo(tipoSeleccionado);
        procesarArchivo(file, tipoSeleccionado);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, tipoSeleccionado: TipoArchivo) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file, tipoSeleccionado);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const procesarArchivo = async (archivo: File, tipoSeleccionado: TipoArchivo) => {
        const formData = new FormData();
        formData.append("file", archivo);
        formData.append("Tipo", tipoSeleccionado);
        formData.append("tipo", tipoSeleccionado);

        try {
            setCargando(true);
            toast.info("📤 Procesando archivo...");

            const res = await axios.post("http://localhost:3000/api/limpiar", formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `${tipoSeleccionado}_limpio.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            toast.success("✅ Archivo procesado y descargado correctamente");
        } catch (err) {
            console.error("Error al enviar archivo:", err);
            toast.error("❌ Hubo un error al limpiar el archivo.");
        } finally {
            setCargando(false);
            setArchivo(null);
            setTipo('');
        }
    };

    const tipos: { id: TipoArchivo, label: string }[] = [
        { id: 'peps', label: 'Lista PEPS' },
        { id: 'ofac', label: 'Lista OFAC' },
        { id: 'onu', label: 'Lista ONU' },
        { id: 'autoridades', label: 'Autoridades' },
        { id: 'observados', label: 'Lista Observados' }
    ];

    return (<div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 md:p-12 relative">

        <h1 className="text-4xl font-bold text-center text-[#003366] mb-2">
            Limpiador de Listas
        </h1>
        <p className="text-center text-gray-600 mb-10 text-sm">
            Arrastra un archivo o examina manualmente
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tipos.map(({ id, label }) => (
                <div
                    key={id}
                    onDrop={(e) => handleDrop(e, id)}
                    onDragOver={handleDragOver}
                    className="relative bg-white border border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow hover:shadow-lg hover:border-[#D4AF37] hover:scale-[1.02] transition"
                >
                    <p className="text-2xl font-semibold text-[#003366] mb-1">{label}</p>
                    <p className="text-sm text-gray-500 mb-2">📎 Arrastra tu archivo aquí</p>

                    <button
                        onClick={() => document.getElementById(`input-${id}`)?.click()}
                        className="text-sm text-[#003366] bg-gray-100 px-4 py-1 rounded-md border border-gray-300 hover:bg-[#D4AF37]/20 transition"
                    >
                        📂 Examinar archivo
                    </button>

                    <input
                        id={`input-${id}`}
                        type="file"
                        accept={EXTENSIONES_MIME[id].ext === 'csv' ? '.csv' : '.xml'}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file, id);
                            e.target.value = '';
                        }}
                        hidden
                    />

                    {tipo === id && archivo && (
                        <p className="text-xs text-gray-700 mt-2 animate-pulse">📄 {archivo.name}</p>
                    )}
                </div>
            ))}
        </div>

        {cargando && (
            <div className="mt-6 text-center text-gray-600 text-sm animate-pulse">
                ⏳ Procesando archivo...
            </div>
        )}

        {!archivo && !cargando && (
            <div className="mt-10 text-center">
                <p className="inline-block bg-[#003366] text-white text-sm font-medium px-6 py-3 rounded-full shadow hover:bg-[#002244] transition">
                    Selecciona una categoría y examina o arrastra tu archivo
                </p>
            </div>
        )}

        <ToastContainer position="bottom-right" />
    </div>
    );
}
