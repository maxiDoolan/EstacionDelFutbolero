import { useEffect, useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom"
import "../styles/success.css"

const Success = () => {

  const { clearCart } = useContext(CartContext)

  useEffect(() => {
    clearCart()
  }, [])

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

        <Link to="/" className="btn-home">
          Volver al inicio
        </Link>

      </div>
    </div>
  )
}

export default Success