import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { CartContext } from "../context/CartContext"
import "../styles/ProductDetail.css"

const ProductDetail = () => {

  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [zoomOpen, setZoomOpen] = useState(false)

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)
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

  // Talles para camisetas
  const TALLES_CAMISETA = ["S", "M", "L", "XL", "XXL"]
  // Colores para medias
  const COLORES_MEDIA = ["Negro", "Blanco"]

  const isMedia = product?.tipo === "media"

  const opciones = isMedia ? COLORES_MEDIA : TALLES_CAMISETA

  const sinStockTotal =
    product?.stock &&
    opciones.every(op => (product.stock[op] || 0) === 0)

  const handleAddToCart = () => {
    if (sinStockTotal) return
    if (!selectedSize) {
      alert(isMedia ? "Seleccioná un color" : "Seleccioná un talle")
      return
    }
    addToCart({ ...product, size: selectedSize })
    const label = isMedia ? `color ${selectedSize}` : `talle ${selectedSize}`
    alert(`Agregado ${label} 🛒`)
  }

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  )
  if (!product) return <h2 style={{ padding: "50px", color: "white" }}>Producto no encontrado</h2>

  return (
    <div className="product-detail">
      <div className="detail-container">

        {/* IMAGEN CON ZOOM */}
        <div className="detail-image" onClick={() => setZoomOpen(true)}>
          <img src={product.image} alt={product.name} />
          <div className="zoom-hint">🔍 Tocá para ampliar</div>
        </div>

        <div className="detail-info">
          <h2>{product.name}</h2>

          {isMedia && (
            <p className="talle-unico-tag">🧦 Talle único</p>
          )}

          <p className="detail-description">{product.description}</p>

          <h3 className="detail-price">${product.price.toLocaleString()}</h3>

          {sinStockTotal && (
            <p style={{ color: "red", fontWeight: "bold" }}>❌ Sin stock</p>
          )}

          {!sinStockTotal && (
            <div className="size-selector">
              <p>{isMedia ? "Seleccionar color:" : "Seleccionar talle:"}</p>
              <div className="sizes-container">
                {opciones.map(op => {
                  const isDisabled = (product.stock?.[op] || 0) === 0
                  return (
                    <button
                      key={op}
                      className={`size-btn ${selectedSize === op ? "active" : ""} ${isMedia ? `color-btn color-btn-${op.toLowerCase()}` : ""}`}
                      disabled={isDisabled}
                      onClick={() => setSelectedSize(op)}
                    >
                      {op}
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

      {/* LIGHTBOX */}
      {zoomOpen && (
        <div className="lightbox" onClick={() => setZoomOpen(false)}>
          <img src={product.image} alt={product.name} />
          <button className="lightbox-close">✕</button>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
