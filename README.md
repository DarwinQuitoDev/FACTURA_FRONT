# FACTURA_FRONT

Frontend del sistema de facturación electrónica. Esta interfaz web permite a los usuarios gestionar clientes, productos y emitir facturas de manera fácil e intuitiva, conectándose con el backend del sistema (FACTURA_BACK).

## 🎯 Características

- 🧾 Creación y visualización de facturas electrónicas
- 👥 Gestión de clientes y productos
- 💡 Interfaz moderna, intuitiva y responsiva
- 🔗 Integración total con el backend vía API REST
- 🌙 Soporte para modo claro/oscuro

## 🛠️ Tecnologías utilizadas

- **React.js** – Librería para interfaces de usuario
- **Vite** – Herramienta de desarrollo ultrarrápida
- **Tailwind CSS** – Framework de estilos utilitarios
- **Axios** – Cliente HTTP para conexión con el backend
- **React Router** – Navegación de páginas

## 🚀 Instalación y ejecución local

1. Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/FACTURA_FRONT.git
cd FACTURA_FRONT
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura el archivo `.env` si utilizas variables de entorno:

```env
VITE_API_URL=http://localhost:3000/api
```

4. Ejecuta la aplicación:

```bash
npm run dev
```

## 📂 Estructura del proyecto

```
FACTURA_FRONT/
├── src/
│   ├── components/        # Componentes reutilizables (botones, formularios)
│   ├── pages/             # Páginas principales de la aplicación
│   ├── services/          # Conexiones con la API
│   ├── styles/            # Archivos CSS/Tailwind
│   └── App.jsx            # Enrutamiento principal
├── public/
├── .env
└── package.json
```
