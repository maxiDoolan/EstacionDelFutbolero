import { Link } from "react-router-dom"
import "../styles/Success.css"

const Failure = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <h1 style={{ color: "#e53e3e" }}>❌ Pago rechazado</h1>
        <p>Tu pago no pudo procesarse.</p>
        <div className="success-info">
          <p>Podés intentarlo nuevamente o elegir otro medio de pago.</p>
          <p>Por cualquier consulta: 1134765561</p>
        </div>
        <Link to="/" className="btn-home">Volver al inicio</Link>
      </div>
    </div>
  )
}

export default Failure
