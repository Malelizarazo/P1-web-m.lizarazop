import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import styles

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data)); // Store user data
        navigate("/robots"); // Redirect to robots list
      } else {
        setError("Credenciales incorrectas. Intenta de nuevo.");
      }
    } catch (error) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="login-container">
      <h1>Adopta un Robot con Robot Lovers!</h1>
      <img src="https://your-image-url.com/robots.png" alt="Robots" className="banner-image" />

      <form onSubmit={handleSubmit} className="login-form">
        <h2>Inicio de sesión</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Nombre de usuario</label>
          <input 
            type="text" 
            className="form-control"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            className="form-control"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">Ingresar</button>
          <button type="button" className="btn btn-danger" onClick={() => setUsername("") & setPassword("")}>
            Cancelar
          </button>
        </div>
      </form>

      <p className="footer">Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
    </div>
  );
}

export default Login;
