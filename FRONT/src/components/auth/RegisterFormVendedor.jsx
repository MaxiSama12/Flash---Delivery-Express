import React, { useState } from "react";
import "../../styles/RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { CLIENTES, VENDEDORES } from "../../endpoints/endpoints";
import axios from "axios";
import { LOGIN, REGISTERCOMERCIO } from "../../router/route";

const RegisterFormVendedor = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    rol: "vendedor", // fijo
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(CLIENTES, formData);
      alert(`!Vendedor Registrado!, Bienvenido ${formData.nombre}`);
      console.log(formData);
      navigate(REGISTERCOMERCIO);
    } catch (error) {
      console.log("Ocurrió un error registrando al vendedor: ", error);
    }
  };

  return (
    <div className="container">
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

export default RegisterFormVendedor;
