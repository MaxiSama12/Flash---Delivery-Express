import {
  DASHBOARDREPARTIDOR, 
  HOME,
  REGISTERCLIENTE,
  REGISTERCOMERCIO,
  REGISTERREPARTIDOR,
} from "../../router/route";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLIENTES } from "../../endpoints/endpoints";
import "../../styles/LoginForm.css";
import axios from "axios";
import { useLogin } from "../../context/useLogin.js";
import { useAuthStore } from "../../store/authStore";
import Swal from "sweetalert2"; // ✅ Importación de SweetAlert2

const LoginForm = () => {
  const { login, } = useAuthStore();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { setId, setNombre, setRol } = useLogin();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(CLIENTES);
      const users = res.data;

      const userFound = users.find((user) => user.email === formData.email);
      if (userFound) {
        if (userFound.password === formData.password) {
          setId(userFound.id);
          setNombre(userFound.nombre_usuario);
          setRol(userFound.rol);
          login(userFound);

          if (userFound.rol === "cliente") {
            Swal.fire(
              "¡Bienvenido!",
              `Inicio de sesión exitoso, bienvenido ${userFound.nombre_usuario}`,
              "success"
            );
            navigate(HOME);
          } else if (userFound.rol === "comercio") {
            Swal.fire(
              "¡Bienvenido!",
              `Inicio de sesión exitoso, bienvenido ${userFound.nombre_usuario}, dueño de ${userFound.nombre_comercio}`,
              "success"
            );
            navigate(`/dashboard-vendedor/${userFound.id}`);
          } else if (userFound.rol === "repartidor") {
            Swal.fire(
              "¡Bienvenido!",
              `Inicio de sesión exitoso, bienvenido ${userFound.nombre_usuario}`,
              "success"
            );
            navigate(DASHBOARDREPARTIDOR);
          }
        } else {
          setLoginError("La contraseña es incorrecta");
        }
      } else {
        setLoginError("El correo ingresado no existe");
      }
    } catch (error) {
      console.log("error trayendo los usuarios:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al conectarse con el servidor",
        "error"
      );
    }
  };

  return (
    <div className="container cont-form p-5 d-flex justify-content-center mt-5">
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
        </label>
        <button type="submit" className="login-button mb-3">
          Ingresar
        </button>
        {loginError && (
          <p className="p-1 text-center alert alert-danger">{loginError}</p>
        )}

        <div className="login-links">
          <p>¿No tienes una cuenta?</p>
          <Link to={REGISTERCLIENTE}>Registrate como Cliente</Link>
          <Link to={REGISTERCOMERCIO}>Registrate tu Comercio</Link>
          <Link to={REGISTERREPARTIDOR}>Registrate como Repartidor</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
