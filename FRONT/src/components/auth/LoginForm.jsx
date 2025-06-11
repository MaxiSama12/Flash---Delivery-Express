import React, { useState } from "react";
import "../../styles/LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inicio de sesión exitoso");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Iniciar Sesión</h2>

      <label>
        Correo electrónico:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
        /> 
      </label>

      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
        /> 
      </label>


      <button type="submit" className="login-button">
        Ingresar
      </button>

      <div className="login-links">
        <p>¿No tienes una cuenta?</p>
        <a href="/registro-cliente">Registrarse como Cliente</a>
        <a href="/registro-vendedor">Registrarse como Vendedor</a>
        <a href="/registro-repartidor">Registrarse como Repartidor</a>
      </div>
    </form>
  );
};

export default LoginForm;
