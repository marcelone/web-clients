# Miguel & Fran — Love, Funk & Disco

Web de boda para Miguel y Fran. Una experiencia digital funky, disco y llena de amor construida con Astro + TypeScript sin frameworks extra.

## Características

- 100% estática — se puede desplegar en cualquier CDN / Cloudflare Workers.
- Sin React, sin Vue, sin Tailwind. CSS nativo + scoped CSS de Astro.
- Tipografía display 70s (**Bagel Fat One** + **Space Grotesk**).
- Paleta disco: naranja, mantequilla, rosa chicle, morado, crema, negro cálido.
- Decoraciones SVG originales (bola de discoteca, flores retro, estrellas, burst, ondas, círculos concéntricos).
- Animaciones: scroll reveal, parallax sutil, disco ball con efecto tilt, marquee, rotación lenta.
- Configuración centralizada en `src/data/wedding.ts`.
- SEO, Open Graph, favicon, skip link y `prefers-reduced-motion`.
- Responsive mobile-first.

## Estructura

```
src/
├── data/wedding.ts            # Configuración central (editable)
├── layouts/BaseLayout.astro   # Layout con SEO, fuentes, scripts
├── pages/index.astro          # Landing de una sola página
├── components/
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── DateSection.astro
│   ├── DressCode.astro
│   ├── Location.astro
│   ├── Accommodation.astro
│   ├── Contact.astro
│   ├── Footer.astro
│   └── decorations/           # SVG primitives
│       ├── DiscoBall.astro
│       ├── Flower.astro
│       ├── Star.astro
│       ├── Burst.astro
│       ├── Squiggle.astro
│       └── Concentric.astro
└── styles/global.css          # Design tokens + reset + utilidades
```

## Cómo personalizar

Edita `src/data/wedding.ts`. Cualquier campo vacío o `"Próximamente"` se mostrará como placeholder visual sin romper enlaces ni contadores.

## Comandos

```bash
npm install         # Instala dependencias
npm run dev         # Servidor de desarrollo
npm run build       # Build de producción (./dist)
npm run preview     # Previsualiza el build

# Verificación visual (requiere Playwright instalado)
node screenshots.cjs
```

Las capturas se guardan en `%TEMP%/boda-shots/`.

## Despliegue en Cloudflare Pages

El build es 100% estático. Se publica como Cloudflare Pages (subdominio `*.workers.dev` o dominio custom).

```bash
# 1. Login interactivo (abre el navegador)
npx wrangler login

# 2. Crear el proyecto (solo la primera vez)
npx wrangler pages project create clients-web --production-branch master

# 3. Build + deploy
npm run deploy
# Equivale a: astro build && wrangler pages deploy ./dist --project-name clients-web
```

URL provisional: `https://clients-web.workers.dev`

### Variables de entorno

Si necesitas variables (p.ej. URL final, IDs de servicios), créalas en
[Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → clients-web → Settings → Environment variables.
