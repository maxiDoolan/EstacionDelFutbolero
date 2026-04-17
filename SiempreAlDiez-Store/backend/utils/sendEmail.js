import nodemailer from "nodemailer"

export const sendEmail = async (order) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const productos = order.items.map(item => 
  `- ${item.name} (Talle: ${item.size}) x${item.quantity} = $${item.price * item.quantity}`
).join("\n")

    const mensaje = `
📦 NUEVO PEDIDO

🆔 Pedido: ${order._id}

👤 Cliente: ${order.customer?.name}
📧 Email: ${order.customer?.email}
📱 Teléfono: ${order.customer?.phone}

📍 Dirección:
${order.customer?.address}
${order.customer?.city}, ${order.customer?.province}
CP: ${order.customer?.postalCode}

🛒 Productos:
${productos}

💵 Total: $${order.total}

🚚 Preparar pedido!
    `

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "💰 Nueva compra en la tienda",
      text: mensaje
    })

    console.log("📧 Email enviado PRO")

  } catch (error) {
    console.log("❌ Error enviando email:", error.message)
  }
}