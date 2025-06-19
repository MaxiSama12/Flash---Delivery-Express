import {
  DASHBOARDREPARTIDOR,
  DASHBOARDCOMERCIO,
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

const LoginForm = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //Zustand para guardar los datos del usuario.
  const { setId, setNombre, setRol } = useLogin();

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
          setId(userFound.id);
          setNombre(userFound.nombre_usuario);
          setRol(userFound.rol);
          login(userFound);
          console.log(userFound);
          alert(
            `Inicio de sesión exitoso, bienvenido ${userFound.nombre_usuario}`
          );
          if (userFound.rol === "cliente") {
            navigate(HOME);
          } else if (userFound.rol === "comercio") {
            alert(
              `Inicio de sesión exitoso, bienvenido ${userFound.nombre_usuario} dueño de ${userFound.nombre_comercio}`
            );
            navigate(`${DASHBOARDCOMERCIO}/${userFound.id}`);
          } else if (userFound.rol === "repartidor") {
            navigate(DASHBOARDREPARTIDOR);
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
          {/* {formData.email} */}
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
          {/* {formData.password} */}
        </label>
        <button type="submit" className="login-button mb-3">
          Ingresar
        </button>
        {loginError ? (
          <p className="p-1 text-center alert alert-danger">{loginError}</p>
        ) : (
          ""
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
