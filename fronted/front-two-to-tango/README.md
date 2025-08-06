# Two to Tango - Frontend

## 📋 Descripción del Proyecto
Aplicación web desarrollada con Next.js que permite a los usuarios registrarse, iniciar sesión y gestionar eventos. Este proyecto forma parte de una prueba técnica que demuestra habilidades en desarrollo frontend con React y Next.js.

## 🚀 Características Principales

### Autenticación
- Registro de nuevos usuarios
- Inicio de sesión
- Almacenamiento de token JWT en localStorage
- Redirección automática según el estado de autenticación

### Eventos
- Listado de eventos
- Visualización detallada de eventos
- Creación de nuevos eventos

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 13+ (App Router)
- **Lenguaje**: JavaScript (ES6+)
- **Estilos**: CSS Modules
- **Gestión de Estado**: React Hooks (useState, useEffect)
- **Enrutamiento**: Next.js App Router
- **Fuentes**: Geist (optimizada con next/font)
- **Bundler**: Webpack (configuración por defecto de Next.js)

## 🏗️ Estructura del Proyecto

```
src/
├── app/                     # Rutas de la aplicación
│   ├── auth/                # Autenticación
│   │   ├── login/           # Página de inicio de sesión
│   │   │   ├── page.jsx     # Componente de la página
│   │   │   └── style.css    # Estilos del login
│   │   └── register/        # Página de registro
│   │       ├── page.jsx     # Componente de la página
│   │       └── style.css    # Estilos del registro
│   ├── events/              # Gestión de eventos
│   │   ├── [id]/           # Página de detalle de evento
│   │   │   └── page.jsx    # Componente del detalle
│   │   ├── new/            # Creación de nuevo evento
│   │   │   └── page.jsx    # Formulario de creación
│   │   └── page.jsx        # Listado de eventos
│   └── layout.js           # Layout principal
└── components/             # Componentes reutilizables
```

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos Previos
- Node.js (v18 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd two-to-tango-mvp/fronted/front-two-to-tango
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre tu navegador en:
   ```
   http://localhost:3000
   ```

## 📝 Flujo de Autenticación

### Registro
1. El usuario completa el formulario con nombre, email y contraseña
2. Se validan los campos (contraseñas coincidentes, email válido)
3. Se simula el registro exitoso
4. Se almacena el token JWT en localStorage
5. Redirección a la página de eventos

### Inicio de Sesión
1. El usuario ingresa email y contraseña
2. Se validan las credenciales
3. En caso exitoso, se almacena el token
4. Redirección a la página de eventos

## 🔒 Variables de Entorno

El proyecto utiliza las siguientes variables de entorno:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api  # URL base de la API
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en producción
- `npm run lint` - Ejecuta el linter

## 🧪 Pruebas

Para ejecutar las pruebas:

```bash
npm test
```

## 🌐 Despliegue

La aplicación puede desplegarse en Vercel con configuración mínima gracias a la integración nativa con Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado como parte de una prueba técnica.
