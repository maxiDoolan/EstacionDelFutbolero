import { useState, useContext } from "react"
import {
  Menu,
  Search,
  User,
  ShoppingBag,
  X,
  ChevronDown
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import "../styles/navBar.css"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [productosOpen, setProductosOpen] = useState(false)

  const { totalItems } = useContext(CartContext)

  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const isAdmin = localStorage.getItem("isAdmin") === "true"

  const closeMenu = () => {
    setMenuOpen(false)
    setProductosOpen(false)
  }

  const handleUserClick = () => {
    closeMenu()

    if (!token) {
      navigate("/login")
    } else if (isAdmin) {
      navigate("/admin")
    } else {
      navigate("/")
    }
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        {/* LEFT */}
        <div className="nav-left">
          <button
            className="icon"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          <Search size={22} className="icon" />
        </div>

        {/* CENTER */}
        <div className="nav-center">
          <Link to="/" className="logo">
            ESTACIÓN DEL FUTBOLERO
          </Link>
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          {/* 👤 USER BUTTON */}
          <button
            className="icon user-button"
            onClick={handleUserClick}
            style={{ background: "none", border: "none" }}
          >
            <User size={22} />
          </button>

          {/* 🛒 CART */}
          <Link to="/carrito" className="cart-icon">
            <ShoppingBag size={22} className="icon" />
            {totalItems > 0 && (
              <span className="cart-count">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* ================= OVERLAY ================= */}
      {menuOpen && (
        <div className="overlay" onClick={closeMenu}></div>
      )}

      {/* ================= SIDEBAR ================= */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>

        <div className="sidebar-header">
          <X size={24} onClick={closeMenu} className="icon" />
        </div>

        <ul>
          <li>
            <Link to="/" onClick={closeMenu}>
              Inicio
            </Link>
          </li>

          <li>
            <div
              className="submenu-toggle"
              onClick={() => setProductosOpen(!productosOpen)}
            >
              <span>Productos</span>
              <ChevronDown
                size={18}
                style={{
                  transform: productosOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "0.2s ease"
                }}
              />
            </div>

                    {productosOpen && (
            <ul className="submenu">

              <li>
                <Link
                  to="/productos?category=Futbol argentino"
                  onClick={closeMenu}
                >
                  Futbol Argentino
                </Link>
              </li>

              <li>
                <Link
                  to="/productos?category=Europeas"
                  onClick={closeMenu}
                >
                  Europeas
                </Link>
              </li>

              <li>
                <Link
                  to="/productos?category=AFA"
                  onClick={closeMenu}
                >
                  AFA
                </Link>
              </li>

              <li>
                <Link
                  to="/productos?category=Selecciones"
                  onClick={closeMenu}
                >
                  Selecciones
                </Link>
              </li>

            </ul>
          )}
          </li>

          <li>
            <Link to="/contacto" onClick={closeMenu}>
              Contacto
            </Link>
          </li>
        </ul>

      </div>
    </>
  )
}




