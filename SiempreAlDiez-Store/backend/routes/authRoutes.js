import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son obligatorios" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Password incorrecta" })
    }

    // Verificar que exista JWT_SECRET
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET no configurado" })
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      isAdmin: user.isAdmin
    })

  } catch (error) {
    console.error("Error en login:", error)
    res.status(500).json({ message: "Error del servidor" })
  }
})

export default router