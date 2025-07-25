import React, { useState } from "react";
import "../../styles/RegisterForm.css";
import { CLIENTES } from "../../endpoints/endpoints";
import { LOGIN } from "../../router/route";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ Importación de SweetAlert2
import { axiosInstance } from "../../router/axiosInstance";

const RegisterFormCliente = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    pass_cliente: "",
    rol: "cliente",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axiosInstance.post("registro-cliente", formData);
      Swal.fire(
        "¡Registro Exitoso!",
        `Cliente registrado correctamente. Bienvenido, ${formData.nombre}!`,
        "success"
      );
   
      navigate(LOGIN);
    } catch (error) {
      console.error("Ocurrió un error registrando al cliente: ", error);
      Swal.fire(
        "Error",
         error.response.data.mensaje,
        "error"
      );
    }
  };

  return (
    <div className="container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="registro-title">Registro de Cliente</h2>

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
          Dirección:
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="registro-input"
            required
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="pass_cliente"
            value={formData.pass_cliente}
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

export default RegisterFormCliente;
