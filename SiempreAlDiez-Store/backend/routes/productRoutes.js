import express from "express"
import Product from "../models/Product.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js"
import cloudinary from "../config/cloudinary.js"
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router()

// ==============================
// GET todos los productos
// ==============================
router.get("/", async (req, res) => {
  try {

    const { all, category } = req.query

    let filter = {}

    // 🔥 Si NO es admin → solo activos
    if (all !== "true") {
      filter.isActive = true
    }

    // 🔥 FILTRO POR CATEGORÍA
    if (category) {
      filter.category = new RegExp(`^${category}$`, "i")
    }

    const products = await Product
      .find(filter)
      .sort({ createdAt: -1 })

    res.json(products)

  } catch (error) {
    console.error("Error GET products:", error)
    res.status(500).json({ message: "Error al obtener productos" })
  }
})

// ==============================
// GET producto por ID
// ==============================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true
    })

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    res.json(product)

  } catch (error) {
    console.error("Error GET product by ID:", error)
    res.status(500).json({ message: "Error al obtener producto" })
  }
})


// ==============================
// POST crear producto (ADMIN)
// ==============================
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {

      // 🔥 PARSEAR STOCK (CLAVE)
      if (req.body.stock) {
        req.body.stock = JSON.parse(req.body.stock)
      }

      const { name, description, price, category, stock } = req.body

      if (!name || !price) {
        return res.status(400).json({
          message: "Nombre y precio obligatorios"
        })
      }

      let imageUrl = ""

      if (req.file) {
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`

        const result = await cloudinary.uploader.upload(base64Image, {
          folder: "productos"
        })

        imageUrl = result.secure_url
      }

      const newProduct = new Product({
        name,
        description,
        price,
        category,
        image: imageUrl,
        stock: stock || {}, // 🔥 YA VIENE ARMADO
        isActive: true
      })

      const savedProduct = await newProduct.save()

      res.status(201).json(savedProduct)

    } catch (error) {
      console.error("ERROR CREANDO PRODUCTO:", error)
      res.status(500).json({ message: "Error creando producto" })
    }
  }
)


// ==============================
// PUT actualizar producto (ADMIN)
// ==============================
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {

    try {

      // 🔥 PARSEAR STOCK (CLAVE)
      if (req.body.stock) {
        req.body.stock = JSON.parse(req.body.stock)
      }

      const { name, description, price, category, stock } = req.body

      let updateData = {
        name,
        description,
        price,
        category,
        stock // 🔥 YA VIENE BIEN ARMADO
      }

      // 🖼️ Si suben nueva imagen
      if (req.file) {
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`

        const result = await cloudinary.uploader.upload(base64Image, {
          folder: "productos"
        })

        updateData.image = result.secure_url
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      )

      if (!updatedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" })
      }

      res.json(updatedProduct)

    } catch (error) {

      console.error("Error PUT product:", error)

      res.status(500).json({
        message: "Error al actualizar producto"
      })

    }

  }
)

// ==============================
// DELETE lógico (ADMIN)
// ==============================
// DELETE REAL (ADMIN)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    res.json({ message: "Producto eliminado correctamente" })

  } catch (error) {
    console.error("Error DELETE product:", error)
    res.status(500).json({ message: "Error al eliminar producto" })
  }
})
export default router