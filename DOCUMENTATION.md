# Documentación del proyecto

Registro cronológico de los cambios, decisiones y hallazgos del proyecto. Las entradas más recientes van primero.

**Formato de cada entrada:**

```
### <fecha y hora> — <título corto>
**Descripción:** <qué se hizo, por qué y qué quedó pendiente>
```

Las horas que no se registraron al momento se marcan como "hora no registrada". Las horas en UTC vienen del reloj de la máquina donde se trabajó.

---

### 22 de noviembre de 2026, 20:09 UTC — README vaciado y documentación del proyecto
**Descripción:** Se vació `README.md` por indicación del usuario, que lo quiere limpio, sin contenido, mientras se define el nuevo. Se quitó el contenido del portafolio anterior (variables de YouTube/Instagram/Facebook, la estructura de Clean Architecture y las instrucciones de un `.env.example` inexistente). Se creó este archivo `DOCUMENTATION.md` para llevar el registro del proyecto.

### Hora no registrada — Limpieza del proyecto para empezar de cero
**Descripción:** Se dejó `src/` solo con `App.tsx`, `index.css` y `main.tsx`. `App.tsx` es un componente vacío y `main.tsx` monta `App` e importa `index.css`. Se borraron `api/`, `scripts/`, `public/`, `src/` (todo lo demás), `AVISO-DE-PRIVACIDAD.md` y `TERMINOS-Y-CONDICIONES.md`. En `vercel.json` se quitó la función `api/verify-email.js`, y en `package.json` el script `upload:image`. Build y lint pasan en una copia limpia. Los cambios no tienen commit. Pendiente: decidir si se borran las dependencias que ya no se usan (`three`, `@react-three/*`, `@supabase/supabase-js`, `cloudinary`, `@vercel/*`, `react-icons`), `index.html` (todavía tiene el SEO y el título anterior) y `sonar-project.properties`.

### 22 de noviembre de 2026, 19:59 UTC — Creación de la rama `fix/reeconstruccion`
**Descripción:** Se creó la rama `fix/reeconstruccion` desde `main` (commit `482fdf2`) y se cambió a ella. No se hizo push.

### Hora no registrada — Análisis inicial del sitio
**Descripción:** Se revisó el sitio anterior sin modificarlo. `npm run build` y `npm run lint` pasaron en una copia. Hallazgos: (1) el endpoint `api/verify-email.js` no tiene autenticación ni límite de peticiones y hace sondeos SMTP desde el dominio; (2) la verificación SMTP probablemente no funciona en Vercel porque bloquea el puerto 25; (3) el aviso de privacidad no menciona el envío de correos a servidores MX de terceros ni a `dns.google`; (4) el formulario de contacto no tiene captcha ni límite de envíos; (5) el README estaba desactualizado.
