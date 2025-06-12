import React, { useState } from "react";
import axios from "axios";
import "../../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";
import {
  DASHBOARDVENDEDOR,
  HOME,
  REGISTERCLIENTE,
  REGISTERREPARTIDOR,
  REGISTERVENDEDOR,
} from "../../router/route";
import { CLIENTES } from "../../endpoints/endpoints";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(CLIENTES);
      const users = res.data;

      //en este codigo se verifica el mail y la contraseña ingresadas y devuelve un error personalizado si no se encuentra el mail o la contraseña
      const userFound = users.find((user) => user.email === formData.email);
      if (userFound) {
        if (userFound.password === formData.password) {
          console.log("el usuario encontrado fue: ", userFound);
          alert(
            `Inicio de sesión exitoso, bienvenido ${userFound.name}`
          );

          if (userFound.rol === "cliente") {
            navigate(HOME);
          } else if (userFound.rol === "vendedor") {
            navigate(DASHBOARDVENDEDOR);
          }
        } else {
          setLoginError("la contraseña es incorrecta");
        }
      } else {
        setLoginError("la contraseña es incorrecta");
      }
    } catch (error) {
      console.log("error trayendo los usuarios:", error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title">
        <b>Iniciar Sesión</b>
      </h2>

      <label>
        Correo electrónico:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
          required
        />
        {formData.email}
      </label>

      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          required
        />
        {formData.password}
      </label>
      <button type="submit" className="login-button">
        Ingresar
      </button>
      <p className="text-center">
        <b>{loginError}</b>
      </p>

      <div className="login-links">
        <p>¿No tienes una cuenta?</p>
        <a href={REGISTERCLIENTE}>Registrate como Cliente</a>
        <a href={REGISTERVENDEDOR}>Registrate como Vendedor</a>
        <a href={REGISTERREPARTIDOR}>Registrate como Repartidor</a>
      </div>
    </form>
  );
};

export default LoginForm;
