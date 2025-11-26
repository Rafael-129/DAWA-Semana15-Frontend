# 🛒 E-commerce Marketplace - Frontend

Aplicación web moderna para e-commerce con autenticación, gestión de productos y roles de usuario.

## 🚀 Tecnologías

- **Next.js** 16.0.4
- **React** 19.2.0
- **TypeScript** 5.x
- **Tailwind CSS** 4.x
- **Context API** para state management

## 📋 Características

- ✅ Autenticación con JWT
- ✅ Registro e inicio de sesión
- ✅ Protección de rutas por rol
- ✅ Panel de administración (solo ADMIN)
- ✅ Catálogo de productos
- ✅ Filtrado por categorías
- ✅ Diseño responsive
- ✅ Gestión de sesión persistente

## 🔧 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Para producción:
```env
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
```

## 🚀 Ejecución

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Producción

```bash
npm run build
npm start
```

## 📱 Rutas

### Públicas

- `/login` - Inicio de sesión
- `/register` - Registro de usuario

### Protegidas (requiere login)

- `/` - Redirige a `/products`
- `/products` - Catálogo de productos (CUSTOMER y ADMIN)
- `/products/[id]` - Detalle de producto

### Solo ADMIN

- `/admin` - Panel de administración

## 🎨 Componentes Principales

### AuthContext

Gestiona el estado global de autenticación:

```typescript
const { user, token, login, logout, isAuthenticated, isAdmin } = useAuth();
```

### ProtectedRoute

HOC para proteger rutas:

```typescript
<ProtectedRoute requireAdmin={true}>
  <AdminContent />
</ProtectedRoute>
```

### Navbar

Navegación con información del usuario autenticado.

## 👥 Roles de Usuario

### CUSTOMER
- Ver productos
- Ver detalle de productos
- Filtrar por categorías

### ADMIN
- Todo lo anterior +
- Crear productos
- Editar productos
- Eliminar productos
- Acceso al panel de administración

## 🗂️ Estructura del Proyecto

```
frontend-marketplace/
├── public/                      # Archivos estáticos
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx        # Panel admin
│   │   ├── login/
│   │   │   └── page.tsx        # Login
│   │   ├── products/
│   │   │   ├── page.tsx        # Lista productos
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Detalle
│   │   ├── register/
│   │   │   └── page.tsx        # Registro
│   │   ├── globals.css         # Estilos globales
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Home
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx     # Context API
│   └── types/
│       └── product.ts          # TypeScript types
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json                 # Config para Vercel
```

## 🔐 Flujo de Autenticación

### Registro

1. Usuario completa formulario en `/register`
2. Se crea cuenta con rol CUSTOMER por defecto
3. Token JWT se guarda en localStorage
4. Redirección a `/products`

### Login

1. Usuario ingresa credenciales en `/login`
2. Backend valida y retorna token
3. Token y datos de usuario se guardan en localStorage
4. AuthContext se actualiza
5. Redirección a `/products`

### Sesión Persistente

El token se mantiene en localStorage hasta:
- Usuario hace logout
- Token expira (7 días)
- Usuario limpia localStorage

## 🎯 Matriz de Acceso

| Ruta | Sin Auth | CUSTOMER | ADMIN |
|------|----------|----------|-------|
| `/login` | ✅ | ✅ | ✅ |
| `/register` | ✅ | ✅ | ✅ |
| `/products` | ❌ → /login | ✅ | ✅ |
| `/products/[id]` | ❌ → /login | ✅ | ✅ |
| `/admin` | ❌ → /login | ❌ → /products | ✅ |

## 🌐 Despliegue en Vercel

### Opción 1: CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Opción 2: Dashboard

1. Ve a https://vercel.com
2. New Project → Import Repository
3. Configuración automática (Next.js)
4. Agregar variable de entorno:
   - `NEXT_PUBLIC_API_URL`: URL de tu backend

### Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
```

### Auto-Deploy

Vercel hace deploy automático al hacer push a `main`.

## 🎨 Estilos

### Tailwind CSS

Utiliza Tailwind CSS 4.x con configuración personalizada.

Colores principales:
- Primary: Blue (autenticación)
- Gray: Neutral (texto, bordes)
- Red: Alertas y errores

### Responsive

Breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

## 📊 TypeScript Types

### User

```typescript
interface User {
  id: number;
  nombre: string;
  email: string;
  roleId: number;
  role: {
    id: number;
    nombre: 'ADMIN' | 'CUSTOMER';
  };
}
```

### Product

```typescript
interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  categoryId?: number;
  imageUrl?: string;
  category?: Category;
}
```

## 🐛 Troubleshooting

### Error de CORS

- Verifica que el backend tenga configurado `FRONTEND_URL`
- El backend debe aceptar tu dominio de Vercel

### Token inválido

- El token expira en 7 días
- Hacer logout y volver a iniciar sesión

### Rutas protegidas no funcionan

- Verifica que `AuthContext` esté en `layout.tsx`
- Revisa que el token esté en localStorage

### Imágenes no cargan

- Verifica que las URLs sean válidas
- Next.js requiere configurar `next.config.ts` para dominios externos

## 📝 Scripts

```bash
npm run dev     # Desarrollo
npm run build   # Build producción
npm start       # Servidor producción
npm run lint    # Linting con ESLint
```

## 🔒 Seguridad

- Tokens JWT almacenados en localStorage
- Protección de rutas en cliente y servidor
- Variables de entorno para URLs sensibles
- Validación de formularios

## 📱 Features Adicionales

### Filtro de Categorías

Los usuarios pueden filtrar productos por categoría en tiempo real.

### Panel de Administración

Los administradores pueden:
- Crear productos con categoría e imagen
- Editar productos existentes
- Eliminar productos
- Ver lista completa en tabla

### Navegación Intuitiva

- Navbar muestra estado de autenticación
- Información del usuario visible
- Logout accesible
- Links condicionales según rol

## 📄 Licencia

Proyecto académico - Tecsup DAWA

## 🤝 Contribuir

Este es un proyecto educativo. Para sugerencias, abre un issue.

## 🔗 Links

- Backend: [Repositorio del Backend](https://github.com/tu-usuario/backend-marketplace)
- Demo: [Ver Demo en Vercel](https://tu-proyecto.vercel.app)
