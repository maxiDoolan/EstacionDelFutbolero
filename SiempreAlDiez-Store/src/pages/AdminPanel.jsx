import { useState, useEffect } from "react"
import "../styles/Admin.css"

const AdminPanel = () => {

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    tipo: "camiseta",
    stockS: "",
    stockM: "",
    stockL: "",
    stockXL: "",
    stockXXL: "",
    stockNegro: "",
    stockBlanco: "",
    featured: false
  })

  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  const API = "/api/products"

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}?all=true`)
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Error cargando productos", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      tipo: "camiseta",
      stockS: "",
      stockM: "",
      stockL: "",
      stockXL: "",
      stockXXL: "",
      stockNegro: "",
      stockBlanco: "",
      featured: false
    })
    setImageFile(null)
    setEditingProduct(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("featured", formData.featured)
      formDataToSend.append("tipo", formData.tipo)

      // Stock según tipo
      let stock
      if (formData.tipo === "media") {
        stock = {
          Negro: Number(formData.stockNegro) || 0,
          Blanco: Number(formData.stockBlanco) || 0
        }
      } else {
        stock = {
          S: Number(formData.stockS) || 0,
          M: Number(formData.stockM) || 0,
          L: Number(formData.stockL) || 0,
          XL: Number(formData.stockXL) || 0,
          XXL: Number(formData.stockXXL) || 0
        }
      }

      formDataToSend.append("stock", JSON.stringify(stock))

      if (imageFile) {
        formDataToSend.append("image", imageFile)
      }

      const url = editingProduct ? `${API}/${editingProduct._id}` : API
      const method = editingProduct ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formDataToSend
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        setLoading(false)
        return
      }

      alert(editingProduct ? "Producto actualizado" : "Producto creado")
      resetForm()
      fetchProducts()
      setLoading(false)

    } catch (error) {
      console.error(error)
      alert("Error guardando producto")
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category || "",
      tipo: product.tipo || "camiseta",
      stockS: product.stock?.S || 0,
      stockM: product.stock?.M || 0,
      stockL: product.stock?.L || 0,
      stockXL: product.stock?.XL || 0,
      stockXXL: product.stock?.XXL || 0,
      stockNegro: product.stock?.Negro || 0,
      stockBlanco: product.stock?.Blanco || 0,
      featured: product.featured || false
    })
  }

  const deleteProduct = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      const data = await res.json()
      if (!res.ok) { alert(data.message); return }
      setProducts(products.filter(p => p._id !== id))
      alert("Producto eliminado")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="admin-container">

      <h2>Panel de Administrador</h2>

      <form className="admin-form" onSubmit={handleSubmit}>

        <input name="name" placeholder="Nombre del producto" value={formData.name} onChange={handleChange} required />
        <input name="price" placeholder="Precio" type="number" value={formData.price} onChange={handleChange} required />
        <input name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} />

        {/* TIPO DE PRODUCTO */}
        <select name="tipo" value={formData.tipo} onChange={handleChange} className="tipo-select">
          <option value="camiseta">👕 Camiseta / Ropa</option>
          <option value="media">🧦 Media (talle único)</option>
        </select>

        {/* STOCK SEGÚN TIPO */}
        {formData.tipo === "camiseta" ? (
          <div className="stock-grid">
            <input name="stockS" placeholder="S" type="number" value={formData.stockS} onChange={handleChange} />
            <input name="stockM" placeholder="M" type="number" value={formData.stockM} onChange={handleChange} />
            <input name="stockL" placeholder="L" type="number" value={formData.stockL} onChange={handleChange} />
            <input name="stockXL" placeholder="XL" type="number" value={formData.stockXL} onChange={handleChange} />
            <input name="stockXXL" placeholder="XXL" type="number" value={formData.stockXXL} onChange={handleChange} />
          </div>
        ) : (
          <div className="stock-grid">
            <input name="stockNegro" placeholder="Stock Negro" type="number" value={formData.stockNegro} onChange={handleChange} />
            <input name="stockBlanco" placeholder="Stock Blanco" type="number" value={formData.stockBlanco} onChange={handleChange} />
          </div>
        )}

        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />

        <label className="featured-label">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          ⭐ Producto destacado
        </label>

        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : editingProduct ? "Actualizar producto" : "Crear producto"}
        </button>

        {editingProduct && (
          <button type="button" onClick={resetForm} className="cancel-btn">
            Cancelar edición
          </button>
        )}

      </form>

      {/* LISTA DE PRODUCTOS */}
      <div className="admin-products">
        <h3>Productos</h3>
        {products.length === 0 && <p>No hay productos</p>}
        {products.map((product) => (
          <div key={product._id} className="admin-product">
            {product.image && <img src={product.image} alt={product.name} />}
            <div>
              <h4>{product.name}</h4>
              <p>${product.price}</p>
              {product.tipo === "media" && <span>🧦 Media</span>}
              {product.featured && <span>⭐ Destacado</span>}
            </div>
            <div className="admin-actions">
              <button onClick={() => handleEdit(product)}>Editar</button>
              <button onClick={() => deleteProduct(product._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AdminPanel
