# Jonathan Rivas — Portfolio

> Cinematic, editorial portfolio for **Jonathan Adrián Rivas Toledo** — Software Engineer · AI · Systems · Automation.
> Inspired by `lauvigne.com`, Linear, Vercel and Apple — built with Next.js 14, TypeScript, Tailwind, Framer Motion, GSAP and Supabase.

---

## ✦ Stack

| Layer        | Tech                                              |
|--------------|---------------------------------------------------|
| Framework    | **Next.js 14** (App Router, RSC, Server Actions)  |
| Language     | **TypeScript** (strict)                           |
| Styling      | **Tailwind CSS** + design tokens (CSS variables)  |
| Motion       | **Framer Motion** · GSAP-ready                    |
| 3D (opcional)| **Three.js** + react-three-fiber                  |
| Backend      | **Supabase** (Postgres · Storage · Auth)          |
| Email        | **Resend** (opcional)                             |
| Deploy       | **Vercel**                                        |

---

## ✦ Estructura

```
portfolio/
├── app/
│   ├── layout.tsx              # Fonts + metadata
│   ├── page.tsx                # Home (server) — fetch + orquestación
│   ├── globals.css             # Design tokens + clases premium
│   ├── api/
│   │   └── contact/route.ts    # POST /api/contact (Resend + DB)
│   └── admin/
│       ├── login/page.tsx      # /admin/login (Supabase auth)
│       └── page.tsx            # /admin (CRUD completo)
│
├── components/
│   ├── PageShell.tsx           # Cliente: intro + nav + footer wrapper
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── sections/
│   │   ├── Intro.tsx           # INITIALIZING SYSTEM / ACCESS GRANTED
│   │   ├── Hero.tsx            # Foto circular dinámica + display name
│   │   ├── About.tsx           # Editorial terminal block
│   │   ├── Skills.tsx          # Cards glassmorphism
│   │   ├── Experience.tsx      # Timeline minimalista
│   │   ├── Projects.tsx        # Dynamic folder system
│   │   ├── Certifications.tsx  # Grid de credenciales
│   │   ├── Resume.tsx          # CV download + preview modal
│   │   └── Contact.tsx         # Form + redes + email directo
│   └── effects/
│       ├── AmbientBackground.tsx  # gradient siguiendo mouse
│       ├── GrainOverlay.tsx
│       └── GridBackdrop.tsx
│
├── lib/
│   ├── supabase.ts             # browser / server / admin clients
│   ├── queries.ts              # data fetching con fallback
│   ├── types.ts                # tipos compartidos
│   ├── data.ts                 # contenido seed extraído del CV
│   └── utils.ts                # cn, formatYear, etc.
│
├── public/
│   ├── placeholders/           # SVGs para proyectos seed
│   └── README.md               # dónde poner profile.jpg + CV.pdf
│
└── supabase/
    └── schema.sql              # tablas + policies + buckets
```

---

## ✦ Setup en 5 pasos

### 1) Instalar dependencias

```bash
npm install
# o bien: pnpm install / bun install
```

### 2) Crear proyecto en Supabase

1. Ve a https://supabase.com → New Project.
2. Espera a que termine el provisioning.
3. En **SQL Editor** → New Query → pega y ejecuta el contenido de
   `supabase/schema.sql`. Esto crea tablas, policies y storage buckets.

### 3) Variables de entorno

Copia `.env.example` a `.env.local` y rellena:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...          # opcional
CONTACT_TO_EMAIL=jonathan.rivas230206@gmail.com
CONTACT_FROM_EMAIL=portfolio@yourdomain.com
NEXT_PUBLIC_ADMIN_EMAIL=jonathan.rivas230206@gmail.com
```

### 4) Crear usuario admin

En **Supabase Dashboard → Authentication → Users → Add user**, crea tu
cuenta con `jonathan.rivas230206@gmail.com` y una contraseña fuerte.

### 5) Arrancar

```bash
npm run dev
```

Abre <http://localhost:3000>. La intro cinematográfica corre la primera vez
por sesión. Para el panel: <http://localhost:3000/admin/login>.

---

## ✦ Cómo cambiar la foto del hero (sin tocar código)

1. Entra a `/admin` → pestaña **Hero & CV**.
2. Click en **Subir nueva imagen**.
3. La imagen se sube a `storage.objects` (bucket `hero`), se obtiene la URL
   pública y se guarda en `site_settings.hero_image_url`.
4. La home la lee como Server Component, así que aparece tras refresh.

> Mientras no haya imagen subida, el Hero usa el fallback `/public/profile.jpg`.
> Coloca ahí la foto que enviaste en el chat si quieres tener un fallback local.

---

## ✦ Cómo agregar proyectos

1. `/admin` → **Projects** → **+ New project**.
2. Rellena título, categoría (web / ai-automation / systems / ui-ux),
   tecnologías separadas por coma, URLs.
3. Sube el preview con el botón **Upload** (queda en bucket `projects`).
4. Marca **Featured** si quieres que destaque.
5. Save.

La home filtra dinámicamente al hacer click en cada carpeta. No hay nada
hardcoded — todo viene de la base de datos.

---

## ✦ Tokens de diseño

Toda la paleta vive en `tailwind.config.ts` y `globals.css`:

| Token        | Valor      | Uso                              |
|--------------|------------|----------------------------------|
| `ink`        | `#050505`  | fondo principal                  |
| `graphite`   | `#2a2a2e`  | superficies oscuras              |
| `mist`       | `#f5f5f7`  | texto / acentos                  |
| `silver`     | `#9ca0a8`  | secundario                       |

Las clases reusables (`card-premium`, `glass-strong`, `btn-premium`,
`eyebrow`, `text-metal`, `hairline`) están en `globals.css`.

---

## ✦ Deploy a Vercel

1. Push del repo a GitHub.
2. En Vercel → Import Project → selecciona el repo.
3. Añade las **Environment Variables** del paso 3 anterior.
4. Deploy.

El proyecto está pre-optimizado: imágenes via `next/image`, fuentes via
`next/font`, datos via React Server Components.

---

## ✦ Roadmap sugerido (extensiones futuras)

- [ ] OG image dinámica con `@vercel/og`
- [ ] Blog con MDX bajo `/notes`
- [ ] i18n (en/es) con `next-intl`
- [ ] Modo "experiment" con `@react-three/fiber` en el hero
- [ ] Páginas dedicadas por proyecto (`/work/[slug]`) con galería

---

## ✦ Créditos

Diseño, código y dirección: **Jonathan Rivas Toledo** · Santa Ana, El Salvador.
Inspiración visual: `lauvigne.com`, Linear, Vercel, Apple.
