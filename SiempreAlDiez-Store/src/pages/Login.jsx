import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Admin.css"

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("https://estaciondelfutbolero.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
      }

      // 🔥 Guardamos token
      localStorage.setItem("token", data.token)
      localStorage.setItem("isAdmin", data.isAdmin)

      alert("Login exitoso 🔥")

      // Si es admin → panel
      if (data.isAdmin) {
        navigate("/admin")
      } else {
        navigate("/")
      }

    } catch (error) {
      alert("Error al iniciar sesión")
    }
  }

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default Login