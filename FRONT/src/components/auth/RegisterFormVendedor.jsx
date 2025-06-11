import React, { useState } from "react";
import "../../styles/RegisterForm.css";

const RegisterFormVendedor = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    rol: "vendedor", // fijo
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    alert("Registro de vendedor exitoso");
  };

  return (
    <form className="registro-form" onSubmit={handleSubmit}>
      <h2 className="registro-title">Registro Vendedor</h2>

      <label>
        Nombre completo:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="registro-input"
        /> 
      </label>

      <label>
        Correo electrónico:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="registro-input"
        /> 
      </label>

      <label>
        Teléfono:
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="registro-input"
        /> 
      </label>

      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="registro-input"
        /> 
      </label>

    

      <button type="submit" className="registro-button">
        Registrarse
      </button>
    </form>
  );
};

export default RegisterFormVendedor;
