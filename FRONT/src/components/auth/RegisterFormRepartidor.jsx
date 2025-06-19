import React, { useState } from "react";
import "../../styles/RegisterForm.css";
import { CLIENTES, REPARTIDORES } from "../../endpoints/endpoints";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../../router/route";

const RegisterFormRepartidor = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    telefono: "",
    email: "",
    vehiculo: "",
    activo: true,
    password: "",
    rol: "repartidor",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(CLIENTES, formData);
      alert(`!Repartidor Registrado!, Bienvenido ${formData.nombre_usuario}`);
      console.log(formData);
      navigate(LOGIN);
    } catch (error) {
      console.log("Ocurrió un error registrando al cliente: ", error);
    }
  };

  return (
    <div className="container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="registro-title">Registro Repartidor</h2>

        <label>
          Nombre completo:
          <input
            type="text"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            className="registro-input"
            required
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
            required
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
            required
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
            required
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
            required
          />
        </label>
        <br />
        <br />
        <button type="submit" className="registro-button">
          Registrarse
        </button>

        <div className="text-center my-2">
          <p>
            Ya tienes una cuenta?,<Link to={LOGIN}>inicia sesión aquí</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterFormRepartidor;
