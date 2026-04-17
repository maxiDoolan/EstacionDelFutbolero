import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import "../styles/ProductCard.css"

const ProductCard = ({ product }) => {

  const { addToCart } = useContext(CartContext)

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <h3 className="product-name">{product.name}</h3>

      <p className="product-price">
        ${product.price.toLocaleString()}
      </p>

      <div className="product-buttons">

        <Link
          to={`/producto/${product._id}`}
          className="btn-detail"
        >
          Ver detalle
        </Link>


      </div>

    </div>
  )
}

export default ProductCard
