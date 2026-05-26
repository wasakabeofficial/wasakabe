import "./LegalPage.css";

export default function PrivacidadPage() {
  return (
    <main className="legal-page">
      <div className="legal-layout">
        <a href="/" className="legal-back">← Volver al inicio</a>

        <h1 className="legal-title">Aviso de Privacidad</h1>
        <p className="legal-meta">
          Wasaka Be — Titular: Ing. Alan de Jesús Martínez Hernández<br />
          Última actualización: 25 de mayo de 2026
        </p>

        <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, opacity: 0.85, marginBottom: 40 }}>
          En cumplimiento con lo dispuesto por la <strong>Ley Federal de Protección de Datos
          Personales en Posesión de los Particulares (LFPDPPP)</strong> y su Reglamento,
          <strong> Wasaka Be</strong> (en adelante, "el Responsable") pone a su disposición
          el presente Aviso de Privacidad.
        </p>

        <section className="legal-section">
          <h2>1. Identidad y Domicilio del Responsable</h2>
          <table className="legal-table">
            <thead>
              <tr><th>Concepto</th><th>Dato</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Responsable</strong></td><td>Ing. Alan de Jesús Martínez Hernández</td></tr>
              <tr><td><strong>Marca comercial</strong></td><td>Wasaka Be</td></tr>
              <tr><td><strong>Correo electrónico</strong></td><td>wasakabeofficial@gmail.com</td></tr>
              <tr><td><strong>Sitio web</strong></td><td>wasakabe.com</td></tr>
            </tbody>
          </table>
        </section>

        <section className="legal-section">
          <h2>2. Datos Personales que se Recaban</h2>

          <h3>2.1 Datos proporcionados directamente por el titular</h3>
          <p>A través del formulario de contacto del Sitio, se recaban los siguientes datos personales:</p>
          <ul>
            <li><strong>Nombre completo</strong></li>
            <li><strong>Correo electrónico</strong></li>
            <li><strong>Mensaje o consulta</strong> (que puede contener información adicional proporcionada voluntariamente)</li>
          </ul>

          <h3>2.2 Datos recabados automáticamente</h3>
          <p>
            A través de <strong>Vercel Web Analytics</strong>, se recopilan de forma anónima los
            siguientes datos: dirección IP (anonimizada), tipo de navegador y versión, sistema operativo,
            páginas visitadas y duración de la visita, país de origen (aproximado) y resolución de pantalla.
          </p>
          <p>
            Estos datos no permiten identificar personalmente al usuario y se utilizan únicamente con
            fines estadísticos y de mejora del servicio.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Finalidades del Tratamiento</h2>

          <h3>3.1 Finalidades primarias (necesarias)</h3>
          <ul>
            <li>Atender y dar seguimiento a consultas, solicitudes de información o cotizaciones realizadas a través del formulario de contacto.</li>
            <li>Establecer comunicación con el usuario para responder a su mensaje.</li>
            <li>Mantener un historial de comunicación para dar continuidad al servicio.</li>
          </ul>

          <h3>3.2 Finalidades secundarias (no necesarias)</h3>
          <ul>
            <li>Realizar estudios de mercado y análisis de comportamiento en el Sitio.</li>
            <li>Enviar comunicaciones promocionales o informativas sobre servicios de <strong>Wasaka Be</strong> (solo cuando el usuario haya otorgado su consentimiento expreso).</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Transferencia de Datos Personales</h2>
          <p>
            <strong>Wasaka Be</strong> no transfiere datos personales a terceros, salvo en los siguientes casos:
          </p>
          <ul>
            <li>
              <strong>Proveedores de servicios tecnológicos:</strong> Supabase (alojamiento de base de datos)
              y Vercel (alojamiento del Sitio y analytics), que actúan como encargados del tratamiento y
              tienen contractualmente prohibido usar los datos para fines propios.
            </li>
            <li>
              <strong>Autoridades competentes:</strong> Cuando exista un requerimiento legal o judicial que así lo exija.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Derechos ARCO</h2>
          <p>
            Usted o su representante legal pueden ejercer los derechos de <strong>Acceso, Rectificación,
            Cancelación y Oposición</strong> (ARCO) en cualquier momento. Para ello, deberá enviar una
            solicitud al correo <strong>wasakabeofficial@gmail.com</strong> con la siguiente información:
          </p>
          <ul>
            <li>Nombre completo del titular.</li>
            <li>Correo electrónico utilizado para la comunicación.</li>
            <li>Descripción clara y precisa del derecho que desea ejercer.</li>
            <li>Documento oficial que acredite su identidad (INE, pasaporte, cédula profesional).</li>
            <li>En caso de actuar mediante representante legal, adjuntar documento que acredite dicha representación.</li>
          </ul>
          <p>
            <strong>Plazo de respuesta:</strong> 20 días hábiles contados desde la recepción de la solicitud,
            prorrogables por 20 días hábiles adicionales cuando el caso lo amerite.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Medidas de Seguridad</h2>
          <p>
            <strong>Wasaka Be</strong> implementa medidas de seguridad administrativas, técnicas y físicas
            para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado:
          </p>
          <ul>
            <li>Cifrado en transmisión de datos (HTTPS/TLS).</li>
            <li>Almacenamiento seguro en bases de datos con acceso restringido.</li>
            <li>Políticas internas de confidencialidad.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Cookies</h2>
          <p>
            El Sitio utiliza <strong>cookies técnicas</strong> necesarias para el funcionamiento básico,
            así como <strong>cookies de analytics</strong> proporcionadas por Vercel Web Analytics.
            Estas últimas recopilan datos anónimos de navegación.
          </p>
          <p>
            Usted puede configurar su navegador para rechazar todas las cookies o para indicarle cuándo
            se está enviando una cookie. Sin embargo, algunas funciones del Sitio podrían no funcionar correctamente.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Consentimiento</h2>
          <p>
            Al proporcionar sus datos personales a través del formulario de contacto, usted otorga su
            consentimiento expreso para que dichos datos sean tratados conforme a este Aviso de Privacidad.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Cambios al Aviso de Privacidad</h2>
          <p>
            <strong>Wasaka Be</strong> se reserva el derecho de modificar el presente Aviso de Privacidad
            en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su
            publicación en el Sitio.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Legislación Aplicable</h2>
          <p>
            Este Aviso de Privacidad se rige por la <strong>Ley Federal de Protección de Datos Personales
            en Posesión de los Particulares (LFPDPPP)</strong> de los Estados Unidos Mexicanos y su Reglamento.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Contacto</h2>
          <p>
            Para cualquier duda o aclaración relacionada con el tratamiento de sus datos personales:
            <br /><strong>wasakabeofficial@gmail.com</strong>
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
