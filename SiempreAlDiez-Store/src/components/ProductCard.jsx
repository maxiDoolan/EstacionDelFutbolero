import { Link } from "react-router-dom"
import "../styles/ProductCard.css"
import { getDiscount } from "../utils/sale"

const ProductCard = ({ product }) => {
  const discount = getDiscount(product)

  return (
    <div className="product-card">

      <Link to={`/producto/${product._id}`} className="product-image-wrapper">
        <img
          src={product.image || "/imagenes/fondo.jpg"}
          alt={product.name}
          className="product-image"
        />
        {discount > 0 && (
          <span className="sale-badge">SALE -{discount}%</span>
        )}
        <div className="product-overlay">
          <span>Ver producto</span>
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          {discount > 0 && (
            <span className="product-old-price">${product.oldPrice.toLocaleString()}</span>
          )}
          ${product.price.toLocaleString()}
        </p>

        <Link to={`/producto/${product._id}`} className="btn-detail">
          Elegir talle
        </Link>
      </div>

    </div>
  )
}

export default ProductCard
