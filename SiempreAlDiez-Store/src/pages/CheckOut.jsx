import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import "../styles/checkout.css"

const Checkout = () => {

  const { cart } = useContext(CartContext)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: ""
  })

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

const handleCheckout = async () => {
  try {

    const orderData = {
      customer: formData,
      items: cart,
      total: totalPrice
    }

    // 🔥 1. crear orden
    const orderRes = await fetch("https://estaciondelfutbolero.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    })

    const order = await orderRes.json()

    // 🔥 2. crear pago en backend
    const paymentRes = await fetch("https://estaciondelfutbolero.onrender.com/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: cart,
        orderId: order._id // 🔥 clave
      })
    })

    const payment = await paymentRes.json()

    // 🔥 3. redirigir a Mercado Pago
    window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${payment.id}`

  } catch (error) {
    console.log(error)
    alert("Error al procesar el pago")
  }
}

  return (
    <div className="checkout-container">

      {/* LEFT SIDE */}
      <div className="checkout-left">
        <h2>Datos de envío</h2>

        <div className="form-group">
          <input name="name" placeholder="Nombre completo" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Teléfono" onChange={handleChange} />
          <input name="province" placeholder="Provincia" onChange={handleChange} />
          <input name="city" placeholder="Ciudad" onChange={handleChange} />
          <input name="address" placeholder="Dirección" onChange={handleChange} />
          <input name="postalCode" placeholder="Código Postal" onChange={handleChange} />
        </div>

        <button className="btn-checkout" onClick={handleCheckout}>
          Confirmar pedido y pagar
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">
        <h3>Resumen del pedido</h3>

        {cart.map((item) => (
          <div key={item._id} className="checkout-item">
            <p>{item.name}</p>
            <p>
              {item.quantity} x ${item.price}
            </p>
          </div>
        ))}

        <hr />

        <h4>Total: ${totalPrice}</h4>
      </div>

    </div>
  )
}

export default Checkout