# Documentación del proyecto

Registro cronológico de los cambios, decisiones y hallazgos del proyecto. Las entradas más recientes van primero.

**Formato de cada entrada:**

```
### <fecha y hora> — <título corto>
**Descripción:** <qué se hizo, por qué y qué quedó pendiente>
```

Las horas que no se registraron al momento se marcan como "hora no registrada". Las horas en UTC vienen del reloj de la máquina donde se trabajó.

---

### 22 de noviembre de 2026, 21:58 UTC — Estructura de carpetas por componentes en `src/`
**Descripción:** Se creó el esqueleto de carpetas del frontend con arquitectura por componentes, sin escribir código todavía. Cada carpeta vacía lleva un archivo `.gitkeep` para que git la registre; se puede borrar cuando la carpeta reciba archivos. Estructura:
- `components/layout/`: `Header`, `Footer`, `MobileMenu`, `ProgressBar`, `SideIndicator`, `Preloader` (piezas fijas de la página).
- `components/ui/`: `Button`, `Tag`, `Toast`, `Slider`, `Accordion`, `FormField` (elementos reutilizables y sin lógica de negocio).
- `components/motion/`: `Reveal`, `TiltCard`, `MagneticWrapper`, `RollingText`, `SectionTransition` (envoltorios de animación e interacción).
- `sections/`: `Hero`, `Services`, `About`, `WhoWeServe`, `Channels`, `Blog`, `Contact` (una carpeta por sección de la landing).
- `pages/`: `Home`, `Privacy`, `Terms` (la home y las dos páginas legales, que se redactarán de nuevo).
- `hooks/`, `lib/` (resorte, utilidades), `data/` (textos de servicios, niveles de "Who we serve", canales), `styles/` (tokens, base, animaciones), `types/`.
- `assets/images`, `assets/icons`, `assets/logos`.
Convención prevista: cada componente en su carpeta con `Nombre.tsx`, `Nombre.css` e `index.ts`. No se tocaron `App.tsx`, `main.tsx` ni `index.css`. Pendiente: decidir si `index.css` pasa a `styles/`, y si se configura un alias de rutas (`@/`) en `tsconfig` y Vite.

### 22 de noviembre de 2026, 21:50 UTC — Decisiones de contenido y servicios para el diseño en Stitch
**Descripción:** Se afinó el prompt de Stitch con estas decisiones. (1) Se quitó la sección "Companies we work with" y los logos de `breinit`, `likecapital` y `neuropoint`, porque WASAKABE aún no ha trabajado con empresas a su nombre y mostrarlos sería una afirmación falsa. El prompt incluye una regla de honestidad: no inventar clientes, casos, cifras, oficinas ni teléfonos, ni nombrar marcas reales (por ejemplo, nada de marcas de autos). (2) Se agregó la sección "Who we serve" (a quién puede servir WASAKABE), con cinco niveles, de negocio de barrio a empresa global, y un deslizador interactivo; el texto habla de a quién puede servir, no de a quién ha servido. (3) Se agregaron interacciones inspiradas en bencho.dev (física de resorte, botones magnéticos, contadores que ruedan, tarjetas que se inclinan) y transiciones entre secciones en ambos sentidos del scroll. (4) Servicios definidos por el propietario, agrupados en cinco áreas: desarrollo de software y calidad (web back y front, móvil, escritorio, bases de datos, QA y testing); IA y automatización (agentes de IA para consultoría, agendamiento de citas y atención al cliente, IA en ERP/CRM, n8n); redes y monitoreo (Zabbix, Nmap, Wireshark); producción creativa (videojuegos indie sencillos, beats, filmmaker y videomaker); planeación, mentoría y asesoría (metodologías de proyectos). Se retiraron AWS, GNS3 y pruebas de penetración de la lista anterior porque no están en la lista confirmada. Pendiente: confirmar si esos tres siguen siendo servicios, y confirmar los textos de cada área.

### 22 de noviembre de 2026, 21:24 UTC — Prototipo refinado de la landing (`prototipo/index.html`)
**Descripción:** Se creó un prototipo HTML estático en `prototipo/index.html` como segunda versión del diseño generado en Stitch, para atender tres observaciones: falta de imágenes, falta de transiciones y que el resultado se viera genérico. Cambios principales: tipografía editorial (Cormorant Garamond para titulares e Inter para texto), secciones numeradas, servicios como lista en lugar de tarjetas, transiciones de entrada del hero, revelado al hacer scroll, barra de progreso, parallax suave, marquee de empresas y menú móvil a pantalla completa. Se respeta la paleta de cinco colores y `prefers-reduced-motion`. Assets: `prototipo/assets/` con el logo WK (`logo.png`) y los logos de empresas (`breinit.png`, `likecapital.png`, `neuropoint.svg`) recuperados del historial de `main`. Se verificó en navegador (escritorio y móvil 375 px) sin desbordamiento horizontal. Pendiente: confirmar que los tres logos son empresas clientes o aliadas; reemplazar los artículos del blog (son marcadores de posición); definir un correo corporativo (la página usa `wasakabeofficial@gmail.com`, que es el de la política de privacidad actual); quitar el contenido inventado de Stitch (cifras, clientes y direcciones que no son reales); y decidir si el sitio final será React o HTML estático.

### 22 de noviembre de 2026, 20:09 UTC — README vaciado y documentación del proyecto
**Descripción:** Se vació `README.md` por indicación del usuario, que lo quiere limpio, sin contenido, mientras se define el nuevo. Se quitó el contenido del portafolio anterior (variables de YouTube/Instagram/Facebook, la estructura de Clean Architecture y las instrucciones de un `.env.example` inexistente). Se creó este archivo `DOCUMENTATION.md` para llevar el registro del proyecto.

### Hora no registrada — Limpieza del proyecto para empezar de cero
**Descripción:** Se dejó `src/` solo con `App.tsx`, `index.css` y `main.tsx`. `App.tsx` es un componente vacío y `main.tsx` monta `App` e importa `index.css`. Se borraron `api/`, `scripts/`, `public/`, `src/` (todo lo demás), `AVISO-DE-PRIVACIDAD.md` y `TERMINOS-Y-CONDICIONES.md`. En `vercel.json` se quitó la función `api/verify-email.js`, y en `package.json` el script `upload:image`. Build y lint pasan en una copia limpia. Los cambios no tienen commit. Pendiente: decidir si se borran las dependencias que ya no se usan (`three`, `@react-three/*`, `@supabase/supabase-js`, `cloudinary`, `@vercel/*`, `react-icons`), `index.html` (todavía tiene el SEO y el título anterior) y `sonar-project.properties`.

### 22 de noviembre de 2026, 19:59 UTC — Creación de la rama `fix/reeconstruccion`
**Descripción:** Se creó la rama `fix/reeconstruccion` desde `main` (commit `482fdf2`) y se cambió a ella. No se hizo push.

### Hora no registrada — Análisis inicial del sitio
**Descripción:** Se revisó el sitio anterior sin modificarlo. `npm run build` y `npm run lint` pasaron en una copia. Hallazgos: (1) el endpoint `api/verify-email.js` no tiene autenticación ni límite de peticiones y hace sondeos SMTP desde el dominio; (2) la verificación SMTP probablemente no funciona en Vercel porque bloquea el puerto 25; (3) el aviso de privacidad no menciona el envío de correos a servidores MX de terceros ni a `dns.google`; (4) el formulario de contacto no tiene captcha ni límite de envíos; (5) el README estaba desactualizado.
