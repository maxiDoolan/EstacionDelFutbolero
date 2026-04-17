import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String
  },

  image: {
    type: String
  },

  // 🔥 STOCK POR TALLE
  stock: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
    XXL: { type: Number, default: 0 }
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
})

export default mongoose.model("Product", productSchema)