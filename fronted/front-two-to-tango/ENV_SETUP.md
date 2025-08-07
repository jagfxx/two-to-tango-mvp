# configuracion de variables de entorno

documentacion para configurar las variables de entorno necesarias para el frontend.

## archivo .env.local

crea un archivo `.env.local` en la raiz del proyecto con las siguientes variables:

```env
# url base de la api del backend
next_public_api_url="http://localhost:3000"

# configuracion de autenticacion (opcional, dependiendo de tu configuracion)
next_auth_secret="secreto_muy_seguro_cambiar_en_produccion"
next_auth_url="http://localhost:3001"

# configuracion de entorno
node_env="development"
```

## variables de entorno disponibles

### next_public_api_url (requerido)
url base de la api del backend. por defecto: `http://localhost:3000`

### next_auth_secret (opcional)
secreto para firmar las cookies de autenticacion. en desarrollo puedes usar cualquier valor.

### next_auth_url (opcional)
url base de la aplicacion frontend para la configuracion de next-auth.

## notas importantes

1. nunca subas el archivo `.env.local` al control de versiones.
2. para entornos de produccion, asegurate de usar valores seguros para los secretos.
3. cualquier cambio en las variables de entorno requiere reiniciar el servidor de desarrollo.
