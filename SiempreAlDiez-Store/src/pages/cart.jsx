import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom"
import "../styles/Cart.css"

export default function Cart() {

  const { cart, removeFromCart, clearCart } = useContext(CartContext)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Tu carrito está vacío 🛒</h2>
        <Link to="/productos" className="btn-primary">
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-container">

      <h2>Tu carrito</h2>

      {cart.map(product => (

        <div
          key={product._id + product.size} // 🔥 IMPORTANTE
          className="cart-item"
        >

          <img
            src={product.image}
            alt={product.name}
            className="cart-image"
          />

          <div className="cart-info">
            <h4>{product.name}</h4>

            {/* 🔥 MOSTRAR TALLE */}
            <p>Talle: {product.size}</p>

            <p>Cantidad: {product.quantity}</p>

            <p>
              ${ (product.price * product.quantity).toLocaleString() }
            </p>
          </div>

          <button
            className="btn-remove"
            onClick={() => removeFromCart(product._id, product.size)} // 🔥 FIX
          >
            Eliminar
          </button>

        </div>

      ))}

      <div className="cart-summary">
        <h3>Total: ${totalPrice.toLocaleString()}</h3>

        <button className="btn-clear" onClick={clearCart}>
          Vaciar carrito
        </button>

        <Link to="/checkout" className="btn-primary">
          Finalizar compra
        </Link>
      </div>

    </div>
  )
}