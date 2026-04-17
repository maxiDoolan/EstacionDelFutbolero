import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import ordersRoutes from "./routes/Orders.js"
import authRoutes from "./routes/authRoutes.js"
import paymentRoutes from "./routes/payment.routes.js";
import webhookRoutes from "./routes/webhook.js"
import redirectRoutes from "./routes/redirect.routes.js"

console.log("API KEY:", process.env.CLOUDINARY_API_KEY)

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/payment", paymentRoutes);
app.use("/api/webhook", webhookRoutes);

app.use("/", redirectRoutes)

app.get("/", (req, res) => {
  res.send("API funcionando")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})