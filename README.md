# Triple Pixel

Básquet arcade pixelado con los equipos de la NBA. Cada persona maneja un jugador; la CPU juega con los demás.
Es el hermano de Picadito Pixel: mismo estilo, mismo menú, torneos y salas online.

- 1 vs 1, 2 vs 2 o 3 vs 3, con los 30 equipos (planteles a mitad de 2026, sin logos).
- Tiro con medidor (zona verde = perfecto), dobles y triples, bandejas, volcadas y alley-oops.
- Rebotes, tapas, robos, giro para proteger la pelota y reloj de posesión de 20 segundos.
- Torneos: Conferencia Este, Conferencia Oeste y Finales NBA.
- Online con salas y link de invitación, chat y cambio de anfitrión si alguien se va.

## Estructura

```
public/      el juego (lo que publica Netlify)
  index.html
  style.css
  game.js
  config.js  dirección del servidor de salas online
netlify.toml
```

## Publicarlo en Netlify

1. Subí este repositorio a GitHub.
2. En Netlify: **Add new site → Import an existing project** y elegí el repositorio.
3. *Base directory* vacío, *Publish directory* `public`, sin comando de build.

## Online

Usa el mismo servidor de salas de Picadito Pixel (`wss://picadito-online.inibag.workers.dev`, en `public/config.js`).
Las salas de básquet tienen otro nombre (`bblobby` y `bb-xxxx`), así que no se mezclan con las de fútbol.
No hace falta publicar otro servidor.
