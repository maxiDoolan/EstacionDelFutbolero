import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { CartContext } from "../context/CartContext"
import "../styles/ProductDetail.css"

const ProductDetail = () => {

  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://estaciondelfutbolero.onrender.com/api/products/${id}`)
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error("Error al traer producto:", error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // 🔥 Detectar si NO hay stock en ningún talle
  const sinStockTotal =
    product?.stock &&
    Object.values(product.stock).every(qty => qty === 0)

  const handleAddToCart = () => {

    if (sinStockTotal) return

    if (!selectedSize) {
      alert("Seleccioná un talle")
      return
    }

    addToCart({
      ...product,
      size: selectedSize
    })

    alert(`Agregado talle ${selectedSize} 🛒`)
  }

  if (loading) return <h2 style={{ padding: "50px" }}>Cargando...</h2>
  if (!product) return <h2 style={{ padding: "50px" }}>Producto no encontrado</h2>

  return (
    <div className="product-detail">
      <div className="detail-container">

        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-info">
          <h2>{product.name}</h2>

          <p className="detail-description">
            {product.description}
          </p>

          <h3 className="detail-price">
            ${product.price.toLocaleString()}
          </h3>

          {/* 🔥 SIN STOCK */}
          {sinStockTotal && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              ❌ Sin stock
            </p>
          )}

          {/* 🔥 SOLO mostrar talles si hay stock */}
          {!sinStockTotal && (
            <div className="size-selector">
              <p>Seleccionar talle:</p>

              <div className="sizes-container">
                {(product.stock
                  ? Object.keys(product.stock)
                  : ["S", "M", "L", "XL", "XXL"]
                ).map(size => {

                  const isDisabled = product.stock && product.stock[size] === 0

                  return (
                    <button
                      key={size}
                      className={`size-btn ${
                        selectedSize === size ? "active" : ""
                      }`}
                      disabled={isDisabled}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <button
            className="detail-button"
            onClick={handleAddToCart}
            disabled={sinStockTotal}
          >
            {sinStockTotal ? "Sin stock" : "Agregar al carrito"}
          </button>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail