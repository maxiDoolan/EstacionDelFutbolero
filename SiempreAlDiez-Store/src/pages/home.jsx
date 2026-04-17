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
        const response = await fetch("http://localhost:5000/api/products");
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

  const destacados = products.slice(0, 3);
  if (loading) return <h2>Cargando productos...</h2>;

  

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
      <section className="featured">
        <h2>Destacados</h2>
        <div className="products-grid">
          {destacados.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* TODOS LOS PRODUCTOS */}
      <section className="all-products">
        <h2>Nuestra Colección</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="benefits">
        <div>🚚 Envío gratis +$55.000</div>
        <div>💳 Pagá como quieras</div>
        <div>📦 Cambios fáciles</div>
      </section>

    </div>
  );
};

export default Home;