import { Link } from "react-router-dom"
import "../styles/ProductCard.css"

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">

      <Link to={`/producto/${product._id}`} className="product-image-wrapper">
        <img
          src={product.image || "/imagenes/fondo.jpg"}
          alt={product.name}
          className="product-image"
        />
        <div className="product-overlay">
          <span>Ver producto</span>
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>

        <Link to={`/producto/${product._id}`} className="btn-detail">
          Elegir talle
        </Link>
      </div>

    </div>
  )
}

export default ProductCard
