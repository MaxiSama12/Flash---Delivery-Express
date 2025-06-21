import React, { useState } from "react";
import "../../styles/RegisterForm.css";
import { CLIENTES } from "../../endpoints/endpoints";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../../router/route";
import Swal from "sweetalert2"; // ✅ Importación de SweetAlert2

const RegisterFormRepartidor = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    vehiculo: "",
    activo: true,
    pass_repartidor: "",
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
      Swal.fire(
        "¡Repartidor Registrado!",
        `Bienvenido, ${formData.nombre}!`,
        "success"
      );
      console.log(formData);
      navigate(LOGIN);
    } catch (error) {
      console.log("Ocurrió un error registrando al cliente: ", error);
      Swal.fire(
        "Error",
        "Hubo un problema al registrar el repartidor. Intenta nuevamente.",
        "error"
      );
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
            name="nombre"
            value={formData.nombre }
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
            ¿Ya tienes una cuenta? <Link to={LOGIN}>Inicia sesión aquí</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterFormRepartidor;
