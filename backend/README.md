# Two to Tango Backend

## Stack
- Framework: NestJS (TypeScript)
- ORM: Prisma
- Database: PostgreSQL

## Configuración de entorno

1. Crea un archivo `.env` en la raíz de `backend` con:
   ```env
   DATABASE_URL="postgresql://postgres:123@localhost:5432/tango_db?schema=public"
   ```
   Cambia el nombre de la base de datos, usuario o contraseña si es necesario.

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Genera el cliente de Prisma y ejecuta migraciones:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## Estructura de Prisma
El archivo `prisma/schema.prisma` define los modelos:
- **User**: Usuarios con email, password, intereses y RSVPs
- **Interest**: Intereses (tags)
- **UserInterest**: Relación muchos a muchos entre usuarios e intereses
- **Event**: Eventos con título, descripción, fecha, ubicación y tags
- **RSVP**: Relación entre usuarios y eventos

## PrismaService
Se creó un servicio `PrismaService` para exponer el cliente de Prisma en los módulos de NestJS (`users`, `auth`, etc).

---

## Siguientes pasos
- Implementar endpoints de registro y login en `/auth`
- Proteger rutas con JWT
- CRUD de eventos y RSVP

