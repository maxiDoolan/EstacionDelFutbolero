import { useEffect, useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { Link, useSearchParams } from "react-router-dom"
import "../styles/Success.css"

const Success = () => {
  const { clearCart } = useContext(CartContext)
  const [searchParams] = useSearchParams()
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const status = searchParams.get("status")
    const paymentId = searchParams.get("payment_id")

    if (status === "approved" && paymentId) {
      clearCart()
      setVerified(true)
    } else {
      setVerified(false)
    }
  }, [])

  if (!verified) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h1>⚠️ Pago no confirmado</h1>
          <p>No pudimos verificar tu pago. Si creés que es un error, contactanos.</p>
          <p>por cualquier consulta: 1134765561</p>
          <Link to="/" className="btn-home">Volver al inicio</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <h1>✅ ¡Pago aprobado!</h1>
        <p>Tu pedido fue realizado con éxito.</p>
        <div className="success-info">
          <p>📦 Estamos preparando tu pedido</p>
          <p>📧 Te enviaremos un email con los detalles</p>
          <p>por cualquier consulta: 1134765561</p>
        </div>
        <Link to="/" className="btn-home">Volver al inicio</Link>
      </div>
    </div>
  )
}

export default Success
