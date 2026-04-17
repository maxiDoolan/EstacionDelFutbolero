import { Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import AdminPanel from "./pages/AdminPanel"
import Home from "./pages/home.jsx"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/cart.jsx"
import Checkout from "./pages/checkout.jsx"
import Productos from "./pages/Productos"
import Success from "./pages/Success"

import Navbar from "./components/NavBar"
import Footer from "./components/Footer"

import "./app.css"

function App() {

  const isAdmin = localStorage.getItem("isAdmin") === "true"

  return (
    <div className="app-container">

      <Navbar />

      <main className="main-content">
        <Routes>

          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:categoria" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />

          {/* Protegida */}
          <Route
            path="/admin"
            element={
              isAdmin
                ? <AdminPanel />
                : <Navigate to="/login" replace />
            }
          />

        </Routes>
      </main>

      <Footer />

    </div>
  )
}

export default App