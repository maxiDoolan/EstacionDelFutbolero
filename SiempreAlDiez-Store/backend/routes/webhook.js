import express from "express"
import axios from "axios"
import Order from "../models/Order.js"
import Product from "../models/Product.js"
import { sendEmail } from "../utils/sendEmail.js"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const paymentId = req.body?.data?.id || req.body?.id
    if (!paymentId) return res.sendStatus(200)

    const { data: payment } = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      }
    )

    if (payment.status !== "approved") {
      return res.sendStatus(200)
    }

    const orderId = payment.external_reference
    if (!orderId) return res.sendStatus(200)

    const order = await Order.findById(orderId)
    if (!order || order.status === "approved") {
      return res.sendStatus(200)
    }

    // 🔥 Descontar stock
    for (const item of order.items) {
      await Product.findOneAndUpdate(
        { _id: item.productId, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } }
      )
    }

    // ✅ Actualizar orden
    order.status = "approved"
    order.paymentId = payment.id
    await order.save()

    // 📧 Email
    await sendEmail(order)

    return res.sendStatus(200)

  } catch (error) {
    console.error("Webhook error:", error.message)
    return res.sendStatus(500)
  }
})

export default router