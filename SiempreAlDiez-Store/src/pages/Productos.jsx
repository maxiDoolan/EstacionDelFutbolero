import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import "../styles/Productos.css"

export default function Productos() {

  const location = useLocation()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchProducts = async () => {
      try {

        // 🔥 AHORA USA LA CATEGORÍA DE LA URL
        const response = await fetch(
          `https://estaciondelfutbolero.onrender.com/api/products${location.search}`
        )

        const data = await response.json()

        setProducts(data)
        setLoading(false)

      } catch (error) {
        console.error("Error al traer productos:", error)
        setLoading(false)
      }
    }

    fetchProducts()

  }, [location.search]) // 🔥 CLAVE

  // 🔥 SACAMOS useParams → ahora usamos query param
  const queryParams = new URLSearchParams(location.search)
  const categoria = queryParams.get("category")

  if (loading) return <h2>Cargando productos...</h2>

  return (
    <div className="productos-container">

      <h2 className="productos-title">
        {categoria
          ? categoria.toUpperCase()
          : "TODOS LOS PRODUCTOS"}
      </h2>

      <div className="productos-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  )
}