import React, { useState } from "react";
import "../../styles/RegisterForm.css";

const RegisterFormRepartidor = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    vehiculo: "",
    activo: true,
    password: "",
    rol: "repartidor",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registro de repartidor exitoso (demo)");
  };

  return (
    <form className="registro-form" onSubmit={handleSubmit}>
      <h2 className="registro-title">Registro Repartidor</h2>

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
        Vehículo:
        <input
          type="text"
          name="vehiculo"
          value={formData.vehiculo}
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

export default RegisterFormRepartidor;
