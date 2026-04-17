import express from "express"
import Order from "../models/Order.js"

const router = express.Router()

router.post("/", async (req, res) => {
  try {

    const { customer, items, total } = req.body

    const newOrder = new Order({
      customer,
      items,
      total,
      status: "pending", // 🔥 importante
      paymentId: null,   // 🔥 importante
      createdAt: new Date()
    })

    await newOrder.save()

    res.status(201).json(newOrder)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creando pedido" })
  }
})

export default router