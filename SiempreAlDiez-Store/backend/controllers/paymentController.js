import { Preference } from "mercadopago";
import client from "../config/mercadopago.js";

export const createOrder = async (req, res) => {
  try {
    const { items, orderId } = req.body; // 🔥 IMPORTANTE

    console.log("🧾 Order ID recibido:", orderId);

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map(item => ({
          id: item._id,
          title: item.name || item.title,
          quantity: item.quantity,
          currency_id: "ARS",
          unit_price: Number(item.price)
        })),

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
    console.log("❌ Error en paymentController:", error);
    res.status(500).json({ error: "Error creando pago" });
  }
};