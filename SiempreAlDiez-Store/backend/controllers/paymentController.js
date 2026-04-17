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

        external_reference: orderId, // 🔥 AHORA SÍ FUNCIONA

              back_urls: {
        success: "https://epistemic-shakita-jovial.ngrok-free.dev/success",
        failure: "https://epistemic-shakita-jovial.ngrok-free.dev/failure",
        pending: "https://epistemic-shakita-jovial.ngrok-free.dev/pending"
      },
      auto_return: "approved",

      notification_url: "https://epistemic-shakita-jovial.ngrok-free.dev/api/webhook"

        
      }
    });

    res.json({ id: result.id });

  } catch (error) {
    console.log("❌ Error en paymentController:", error);
    res.status(500).json({ error: "Error creando pago" });
  }
};