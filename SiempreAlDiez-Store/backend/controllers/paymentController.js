import { Preference } from "mercadopago";
import client from "../config/mercadopago.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { items, orderId } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items inválidos" });
    }

    // 🔒 Verificar precios desde la base de datos
    const verifiedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item._id || item.productId);
        if (!product || !product.isActive) {
          throw new Error(`Producto no encontrado: ${item._id}`)
        }
        return {
          id: product._id.toString(),
          title: product.name,
          quantity: item.quantity,
          currency_id: "ARS",
          unit_price: product.price  // precio real desde DB, no del frontend
        };
      })
    );

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: verifiedItems,
        external_reference: orderId,
        back_urls: {
          success: `${process.env.FRONTEND_URL}/success`,
          failure: `${process.env.FRONTEND_URL}/failure`,
          pending: `${process.env.FRONTEND_URL}/pending`
        },
        auto_return: "approved",
        notification_url: `${process.env.BACKEND_URL}/api/webhook`
      }
    });

    res.json({ id: result.id });

  } catch (error) {
    console.error("❌ Error en paymentController:", error);
    res.status(500).json({ error: "Error creando pago" });
  }
};
