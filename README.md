# OttO — Il drink che ti segue

Sito vetrina di **OttO**, cocktail & mocktail bar da passeggio in Via Garibaldi 76, Cagliari.
Drink artigianali con frutta fresca di giornata. Da portare con te per le vie del centro.

Single-page React, mobile-first, deploy automatico su GitHub Pages.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS 3
- lucide-react (icone)

## Sviluppo

```bash
npm install
npm run dev      # server locale
npm run build    # build di produzione in dist/
npm run preview  # anteprima della build
```

## Contenuti del sito

- Hero con vetrina del locale
- Concept (cocktail + mocktail, frutta fresca)
- Manifesto mocktail
- Antonio, il barman
- Recensioni reali
- Dove siamo: indirizzo, telefono, WhatsApp, Instagram, orari, mappa
- Barra azioni mobile: Chiama / Indicazioni / Instagram

## Contatti

- Indirizzo: Via Garibaldi 76, 09125 Cagliari (CA)
- Telefono: 320 831 9987
- Instagram: [@otto_cagliari](https://instagram.com/otto_cagliari)

## Deploy

Ogni push su `main` lancia il workflow `.github/workflows/deploy.yml` che builda e
pubblica `dist/` su GitHub Pages.

### Dominio personalizzato

Il `base` di Vite è `/` (root), pronto per un dominio custom.

1. Repo → Settings → Pages → Custom domain: inserire il dominio.
2. Aggiungere il file `public/CNAME` con il dominio (es. `ottocagliari.it`).
3. Impostare i record DNS del dominio verso GitHub Pages.

Senza dominio custom il sito è servito su `https://<utente>.github.io/otto-cagliari/`:
in quel caso impostare `base: '/otto-cagliari/'` in `vite.config.ts`.
