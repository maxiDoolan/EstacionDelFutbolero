import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "./models/User.js"

const generar = async () => {
  await mongoose.connect(process.env.MONGO_URI)

  const hash = await bcrypt.hash("2424", 10)

  await User.create({
    name: "Admin",
    email: "estaciondelfutbolero@gmail.com",
    password: hash,
    isAdmin: true
  })

  console.log("✅ Admin creado!")
  process.exit()
}

generar()