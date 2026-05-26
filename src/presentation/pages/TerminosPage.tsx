import "./LegalPage.css";

export default function TerminosPage() {
  return (
    <main className="legal-page">
      <div className="legal-layout">
        <a href="/" className="legal-back">← Volver al inicio</a>

        <h1 className="legal-title">Términos y Condiciones</h1>
        <p className="legal-meta">
          Wasaka Be — Titular: Ing. Alan de Jesús Martínez Hernández<br />
          Última actualización: 25 de mayo de 2026
        </p>

        <section className="legal-section">
          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar el sitio web <strong>wasakabe.com</strong> (en adelante, "el Sitio"),
            usted acepta cumplir y quedar vinculado por los presentes Términos y Condiciones.
            Si no está de acuerdo con alguna parte de estos términos, deberá abstenerse de utilizar el Sitio.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Identificación del Titular</h2>
          <table className="legal-table">
            <thead>
              <tr><th>Concepto</th><th>Dato</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Nombre</strong></td><td>Ing. Alan de Jesús Martínez Hernández</td></tr>
              <tr><td><strong>Marca</strong></td><td>Wasaka Be</td></tr>
              <tr><td><strong>Contacto</strong></td><td>wasakabeofficial@gmail.com</td></tr>
            </tbody>
          </table>
        </section>

        <section className="legal-section">
          <h2>3. Descripción del Servicio</h2>
          <p>
            El Sitio es un portafolio profesional que presenta: trayectoria profesional y formación
            académica del titular, servicios ofrecidos en desarrollo web, inteligencia artificial y
            creación de contenido, galería de proyectos, formulario de contacto para consultas y
            cotizaciones, y enlaces a redes sociales y canales de contenido.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Uso del Sitio</h2>
          <p>El usuario se compromete a:</p>
          <ul>
            <li>Utilizar el Sitio únicamente para fines legales y de acuerdo con estos términos.</li>
            <li>No realizar actividades que puedan dañar, interferir o sobrecargar el funcionamiento del Sitio.</li>
            <li>No intentar acceder a áreas restringidas del Sitio sin autorización.</li>
            <li>No utilizar robots, spiders u otros mecanismos automatizados para extraer datos del Sitio.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Propiedad Intelectual</h2>
          <p>
            Todo el contenido publicado en el Sitio —incluyendo pero no limitado a textos, imágenes,
            logotipos, ilustraciones, fotografías, código fuente, diseños y materiales audiovisuales—
            es propiedad de <strong>Wasaka Be</strong> o se utiliza con la debida autorización de sus titulares.
          </p>
          <p>
            Queda prohibida la reproducción, distribución, modificación, exhibición pública o cualquier
            otra forma de explotación del contenido sin el consentimiento previo y por escrito del titular.
          </p>
          <h3>5.1 Código y Software</h3>
          <p>
            El código fuente del Sitio se encuentra en un repositorio privado. No se concede ninguna
            licencia implícita para su uso, reproducción o distribución.
          </p>
          <h3>5.2 Marcas</h3>
          <p>
            "Wasaka Be" y el logotipo asociado son marcas registradas de Alan de Jesús Martínez Hernández.
            Su uso no autorizado está prohibido.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Privacidad y Protección de Datos</h2>
          <p>
            El manejo de datos personales se rige por nuestro{' '}
            <a href="/aviso-de-privacidad" style={{ color: "var(--color-gold-400)" }}>
              Aviso de Privacidad
            </a>.
            Al utilizar el formulario de contacto, el usuario proporciona voluntariamente datos personales
            (nombre, correo electrónico y mensaje), los cuales serán utilizados exclusivamente para
            responder a su solicitud.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Enlaces a Terceros</h2>
          <p>
            El Sitio puede contener enlaces a sitios web de terceros (redes sociales, plataformas de
            contenido, servicios externos). <strong>Wasaka Be</strong> no asume responsabilidad alguna
            por el contenido, políticas de privacidad o prácticas de dichos sitios. El usuario accede
            a ellos bajo su propio riesgo.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Limitación de Responsabilidad</h2>
          <p>
            El Sitio se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo,
            ya sean expresas o implícitas. <strong>Wasaka Be</strong> no garantiza que el Sitio esté
            libre de errores, virus o componentes dañinos; que el acceso sea ininterrumpido o seguro;
            ni que la información publicada sea exacta, completa o actualizada.
          </p>
          <p>
            En ningún caso <strong>Wasaka Be</strong> será responsable por daños directos, indirectos,
            incidentales, consecuentes o punitivos derivados del uso o la imposibilidad de uso del Sitio.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Modificaciones</h2>
          <p>
            <strong>Wasaka Be</strong> se reserva el derecho de modificar estos Términos y Condiciones
            en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación
            en el Sitio. Se recomienda al usuario revisar esta página periódicamente.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Legislación Aplicable</h2>
          <p>
            Estos Términos y Condiciones se rigen por las leyes de los <strong>Estados Unidos Mexicanos</strong>.
            Cualquier controversia relacionada con el Sitio será sometida a la jurisdicción de los
            tribunales competentes en el estado de Hidalgo, México.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Contacto</h2>
          <p>
            Para cualquier duda o aclaración: <strong>wasakabeofficial@gmail.com</strong>
          </p>
        </section>

        <div className="legal-divider" aria-hidden="true" />

        <p className="legal-footer-note">
          © {new Date().getFullYear()} Wasaka Be. Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
}
