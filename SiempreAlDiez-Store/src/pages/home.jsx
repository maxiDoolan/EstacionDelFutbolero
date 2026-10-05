import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";
import { isOnSale } from "../utils/sale";

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

  const liquidacion = products.filter(p => isOnSale(p));
  const destacados = products.filter(p => p.featured === true && !isOnSale(p));
  const resto = products.filter(p => p.featured !== true && !isOnSale(p));

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

      {/* LIQUIDACIÓN */}
      {liquidacion.length > 0 && (
        <section className="featured sale-section">
          <h2>🔥 Liquidación</h2>
          <p className="sale-subtitle">Precios de renovación · Stock limitado</p>
          <div className="products-grid">
            {liquidacion.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <Link to="/productos?sale=true" className="sale-see-all">
            Ver toda la liquidación
          </Link>
        </section>
      )}

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
