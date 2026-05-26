# 🇲🇽 Wasakabe — Portfolio Profesional

> **Wasakabe** es el portafolio digital de **Alan de Jesús Martínez Hernández**, desarrollador web full-stack y fundador de Wasaka Be. El sitio muestra su trayectoria, servicios, experiencia profesional y canales de contenido, con una estética oscura editorial y soporte multilingüe (6 idiomas).

---

## 📋 Tabla de Contenido

- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Características](#características)
- [Empezar](#empezar)
- [Scripts Disponibles](#scripts-disponibles)
- [Variables de Entorno](#variables-de-entorno)
- [Internacionalización](#internacionalización)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Despliegue](#despliegue)
- [Licencia](#licencia)

---

## 🛠 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Framework** | React 19 + TypeScript 6 |
| **Build tool** | Vite 8 |
| **Estilos** | CSS puro con variables de diseño + Tailwind CSS 4 |
| **Iconos** | react-icons |
| **Backend** | Supabase (PostgreSQL + REST API) |
| **Email** | API serverless de verificación SMTP (Vercel Functions) |
| **Analytics** | Vercel Web Analytics |
| **Linting** | ESLint 10 + typescript-eslint |
| **Paquete** | npm |

---

## 🏗 Arquitectura

El proyecto sigue una **Clean Architecture** en 3 capas, separando responsabilidades de forma estricta:

```
src/
├── core/               # Dominio puro — sin dependencias externas
│   ├── ports/          # Interfaces (puertos) para inversión de dependencias
│   └── value-objects/  # Objetos de valor y lógica de dominio
│
├── application/        # Casos de uso — orquestan la lógica de negocio
│   ├── services/       # Servicios de aplicación
│   └── use-cases/      # Casos de uso ejecutables
│
├── infrastructure/     # Implementaciones concretas (API, DB, servicios externos)
│   └── api/            # Clientes HTTP, verificación DNS, repositorios
│
└── presentation/       # Capa de UI (React)
    ├── components/     # Componentes compartidos (Navbar)
    ├── sections/       # Secciones de página (Hero, About, Services…)
    ├── hooks/          # Hooks personalizados
    ├── context/        # Contextos de React (Dependencies, I18n)
    ├── i18n/           # Sistema de internacionalización
    └── utils/          # Utilidades (scroll smoother)
```

### Principios aplicados

- **Dependency Inversion (SOLID DIP):** Los casos de uso dependen de interfaces definidas en `core/ports/`, no de implementaciones concretas.
- **Composition Root:** `DependenciesContext` inyecta todas las dependencias desde un solo punto.
- **Value Objects:** `Email` encapsula validación y retorna códigos de error tipados (`EmailErrorCode`).
- **DRY:** Los estilos compartidos (eyebrow, títulos, layouts, media queries) viven en `shared.css`.

---

## ✨ Características

- 🌐 **Multi-idioma:** Español, English, 中文, 한국어, Русский, 日本語 — con detección del navegador y persistencia en localStorage.
- 🇲🇽 **Identidad mexicana:** Bandera mexicana junto a cada ubicación en la sección de experiencia.
- 📱 **Responsive:** Adaptado a desktop, tablet y móvil.
- 🎨 **Estética oscura editorial:** Paleta dorada/carmesí sobre fondo oscuro, tipografía display + monoespaciada.
- ✉️ **Formulario de contacto inteligente:** Validación de email del lado cliente (DNS MX check + API serverless) antes de enviar.
- ⚡ **Rendimiento:** Build optimizado ~480 KB JS (143 KB gzip), sin librerías externas pesadas.
- 📊 **Analytics:** Vercel Web Analytics para métricas de visitas.

---

## 🚀 Empezar

### Requisitos

- Node.js ≥ 20
- npm ≥ 10

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/wasakabe.git
cd wasakabe

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

El servidor se levanta en `http://localhost:5173`.

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo Vite |
| `npm run build` | Compila TypeScript + empaqueta para producción |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint en todo el proyecto |

---

## 🔐 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `VITE_YOUTUBE_ID` | ID del canal de YouTube | ✅ |
| `VITE_YOUTUBE_API_KEY` | API Key de YouTube Data API | ✅ |
| `VITE_INSTAGRAM_TOKEN` | Token de acceso de Instagram | ❌ |
| `VITE_FACEBOOK_PAGE_ID` | ID de la página de Facebook | ✅ |
| `VITE_SUPABASE_URL` | URL del proyecto Supabase | ✅ |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clave pública anónima de Supabase | ✅ |

---

## 🌍 Internacionalización

El sistema de i18n es **casero** (sin librerías externas) para mantener el bundle al mínimo:

- **6 idiomas:** Español, English, 中文, 한국어, Русский, 日本語.
- **Detección automática:** Detecta el idioma del navegador al cargar (`navigator.language`).
- **Persistencia:** Guarda la selección en `localStorage`.
- **Selector:** Menú desplegable en el Navbar (desktop y mobile).

Las traducciones viven en `src/presentation/i18n/translations.ts`.

---

## 📁 Estructura del Proyecto

```
wasakabe/
├── api/                    # Serverless functions (Vercel)
│   └── verify-email.js     # Verificación SMTP de email
├── public/                 # Assets estáticos
├── src/
│   ├── assets/             # Imágenes (yo, chica, logo)
│   ├── core/               # Capa de dominio
│   │   ├── ports/          # Interfaces (IContactRepository, IEmailVerifier, etc.)
│   │   └── value-objects/  # Email (validación con códigos de error)
│   ├── application/        # Casos de uso
│   │   ├── services/       # EmailValidationService
│   │   └── use-cases/      # SubmitContactUseCase
│   ├── infrastructure/     # Implementaciones
│   │   └── api/            # SupabaseContactRepository, BackendEmailVerifier, etc.
│   ├── presentation/       # UI
│   │   ├── components/     # Navbar
│   │   ├── sections/       # Hero, About, Services, Experience, Canal, Contact, Footer
│   │   ├── hooks/          # useContactForm
│   │   ├── context/        # DependenciesContext, I18nContext
│   │   ├── i18n/           # Traducciones, provider y hook
│   │   └── utils/          # scrollSmoother
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Variables de diseño globales
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

---

## ☁️ Despliegue

El proyecto está diseñado para desplegarse en **Vercel**:

1. Conecta el repositorio a Vercel.
2. Configura las variables de entorno en el dashboard.
3. Vercel detecta automáticamente Vite y configura el build.
4. Las funciones serverless en `api/` se despliegan como Vercel Functions.

---

## 📄 Licencia

Este proyecto es de código privado. Todos los derechos reservados © Wasaka Be.

---

<p align="center">
  Hecho con ❤️ en México
</p>
