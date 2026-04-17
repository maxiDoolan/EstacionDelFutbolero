import "../styles/footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>🚚 Envío gratis CABA</p>
        <p>💳 Pagá como quieras </p>
      </div>

      <div className="footer-contact">
        <p>📱 Contacto: 1134765561</p>
        <p>✉️ Email: EstacionDelFutbolero@gmail.com</p>
      </div>

      <div className="footer-social">
        <a href="https://www.instagram.com/estaciondelfutbolero/#" target="_blank">
          Instagram
        </a>
      </div>

      <p className="footer-copy">
        © 2026 Estacion del Futbolero - Todos los derechos reservados
      </p>
    </footer>
  )
}

export default Footer