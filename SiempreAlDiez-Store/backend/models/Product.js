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

  // Stock por talle (camisetas) o por color (medias)
  stock: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
    XXL: { type: Number, default: 0 },
    Negro: { type: Number, default: 0 },
    Blanco: { type: Number, default: 0 }
  },

  tipo: {
    type: String,
    enum: ["camiseta", "media"],
    default: "camiseta"
  },

  isActive: {
    type: Boolean,
    default: true
  },

  featured: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
})

export default mongoose.model("Product", productSchema)