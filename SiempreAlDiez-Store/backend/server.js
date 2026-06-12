import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import connectDB from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"
import ordersRoutes from "./routes/Orders.js"
import authRoutes from "./routes/authRoutes.js"
import paymentRoutes from "./routes/payment.routes.js"
import webhookRoutes from "./routes/webhook.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

// API routes
app.use("/api/products", productRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/webhook", webhookRoutes)

// Servir frontend React
app.use(express.static(path.join(__dirname, "../dist")))

// Catch-all para React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})