import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // ==========================
  // AGREGAR AL CARRITO
  // ==========================
  const addToCart = (product) => {

    setCart(prevCart => {

      const existingProduct = prevCart.find(
        item =>
          item._id === product._id &&
          item.size === product.size // 🔥 CLAVE
      )

      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }

    })
  }

  // ==========================
  // ELIMINAR (POR TALLE)
  // ==========================
  const removeFromCart = (id, size) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item._id === id && item.size === size)
      )
    )
  }

  // ==========================
  // VACIAR
  // ==========================
  const clearCart = () => {
    setCart([])
  }

  // ==========================
  // TOTAL ITEMS
  // ==========================
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  )
}