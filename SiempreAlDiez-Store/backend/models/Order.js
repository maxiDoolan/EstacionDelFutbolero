import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    province: String,
    city: String,
    address: String,
    postalCode: String
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      size: String
    }
  ],
  total: Number,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true })


export default mongoose.model("Order", orderSchema)