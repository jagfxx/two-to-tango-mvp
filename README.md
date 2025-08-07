# two to tango - mi solucion

## que puedes hacer

### para empezar
- crea una cuenta con tu email y contraseña
- inicia sesion 
- las rutas estan protegidas, asi que necesitaras estar autenticado

### eventos
- crea eventos facilmente: solo necesitas un titulo, descripcion, fecha y lugar
- vista a todos los eventos disponibles
- revisa los detalles de cada evento 
- usa el boton de rsvp para confirmar tu asistencia

### tu perfil
- lleva el control de los eventos a los que te has apuntado
- revisa tu historial de asistencia

## estructura del proyecto

```
two-to-tango-mvp/
├── fronted/
│   └── front-two-to-tango/      # aplicacion frontend (next.js 14)
│       ├── src/
│       │   ├── app/            # rutas de la aplicacion
│       │   ├── components/      # componentes reutilizables
│       │   └── lib/            # utilidades y configuracion
│       └── ...
├── backend/                    # aplicacion backend (nestjs)
│   ├── src/
│   │   ├── auth/              # autenticacion y autorizacion
│   │   ├── events/            # logica de eventos
│   │   ├── users/             # manejo de usuarios
│   │   ├── prisma/            # esquema y migraciones
│   │   └── main.ts            # punto de entrada
│   └── ...
└── readme.md
```

## lo que necesitas para empezar

asegurate de tener esto instalado:

- node.js v18 o mas reciente (yo uso la 18.16.0)
- npm (viene con node) o yarn si lo prefieres
- postgresql corriendo en tu maquina
- git para el control de versiones

## vamos a ponerlo en marcha

### primero el backend

1. abre una terminal y entra en la carpeta del backend:
   ```bash
   cd backend
   ```

2. instala todo lo que necesites:
   ```bash
   npm install
   ```

3. configuracion rapida:
   - copia `.env.example` a `.env`
   - ajusta las credenciales de postgres si es necesario
   - el puerto por defecto es 3000

4. levanta la base de datos con prisma:
   ```bash
   npx prisma migrate dev
   ```

5. enciende el servidor:
   ```bash
   npm run start:dev
   ```
   si todo va bien, veras un mensaje como `nest application successfully started`

### ahora el frontend

1. abre otra terminal (deja el backend corriendo) y ve al front:
   ```bash
   cd fronted/front-two-to-tango
   ```

2. instala las dependencias:
   ```bash
   npm install
   ```

3. configuracion basica:
   - crea un archivo `.env.local`
   - agrega esta linea: `next_public_api_url=http://localhost:3000`

4. enciende el frontend:
   ```bash
   npm run dev
   ```
   abre tu navegador en `http://localhost:3001` y listo

## datos para probar

te dejo unas credenciales para que puedas probar sin tener que registrarte:

- **usuario**: test@example.com
- **clave**: test1234

si prefieres crear tu propia cuenta, adelante. solo necesitas un email valido y una contraseña de al menos 6 caracteres.

## como funciona por dentro

te cuento un poco sobre la api. todos los endpoints necesitan que estes autenticado (solo el registro y login son publicos).

### autenticacion

- `post /auth/register` - crea una cuenta nueva
- `post /auth/login` - inicia sesion y te da un token

### eventos

- `get /events` - lista todos los eventos disponibles
- `post /events` - crea un evento nuevo (necesitas estar logueado)
- `get /events/:id` - muestra los detalles de un evento
- `patch /events/:id` - actualiza un evento (solo el dueño puede)
- `delete /events/:id` - borra un evento (cuidado con esto)
- `post /events/:id/rsvp` - apuntate a un evento
- `get /events/:id/attendees` - quien va al evento
- `get /events/:id/suggestions` - sugerencias de gente que podria interesarte (basado en intereses)

### tu perfil

- `get /users/me` - tu informacion de perfil
- `get /users/me/events` - eventos a los que te has apuntado

si quieres probar rapido, importa la coleccion de postman que esta en la raiz del proyecto. ya tiene todos los endpoints configurados.

## con que esta hecho esto


### frontend
- **next.js 14** 
- **react 19** 
- **tailwindcss** 
- **next-auth**

### backend
- **nestjs** 
- **typescript** 
- **prisma** 
- **postgresql** 
- **jsonwebtoken** 

