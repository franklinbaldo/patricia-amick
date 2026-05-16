# Patricia & Amick

Un regalo de Patricia para Amick · una página web romántica que celebra el mes en que se encontraron bajo la Vía Láctea de San Pedro de Atacama.

Sitio en vivo: https://franklinbaldo.github.io/patricia-amick/

## Desarrollo

```bash
npm install
npm run dev
```

El servidor `server.ts` solo se usa en desarrollo (provee `/api/horoscope` vía Gemini si `GEMINI_API_KEY` está configurada). En producción el sitio es 100% estático y usa `public/horoscope.json`.

## Build estático

```bash
npx vite build
```

El resultado va a `dist/` y se publica automáticamente en GitHub Pages vía `.github/workflows/pages.yml` al hacer push a `main`.

## Assets

- `public/photos/01..04-*.jpg` — fotos del casal
- `public/video/nuestra-noche.mp4` — fragmento de la noche
- Música: playlist de Spotify embebida (`4UM1r4r2Yi3ZPt9Qntwnk5`)
- `public/horoscope.json` — la carta romántica estática
