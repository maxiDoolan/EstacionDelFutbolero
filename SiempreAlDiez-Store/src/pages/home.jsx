import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al traer productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const destacados = products.filter(p => p.featured === true);
  const resto = products.filter(p => p.featured !== true);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando productos...</p>
    </div>
  );

  return (
    <div className="home">

      {/* HERO PRINCIPAL */}
      <section className="hero">
        <div className="hero-content">
          <Link to="/productos" className="hero-btn">
            VER COLECCIÓN
          </Link>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      {destacados.length > 0 && (
        <section className="featured">
          <h2>Destacados</h2>
          <div className="products-grid">
            {destacados.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* TODOS LOS PRODUCTOS (sin los destacados) */}
      <section className="all-products">
        <h2>Nuestra Colección</h2>
        <div className="products-grid">
          {resto.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="benefits">
        <div>🚚 Envío gratis +$55.000</div>
        <div>💳 Pago seguro con Mercado Pago</div>
        <div>📦 Cambios Garantizados</div>
      </section>

    </div>
  );
};

export default Home;
