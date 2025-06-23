import {
  DASHBOARDREPARTIDOR, 
  HOME,
  REGISTERCLIENTE,
  REGISTERCOMERCIO,
  REGISTERREPARTIDOR,
} from "../../router/route";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/LoginForm.css";
import { useAuthStore } from "../../store/authStore";
import Swal from "sweetalert2"; // ✅ Importación de SweetAlert2
import { axiosInstance } from "../../router/axiosInstance.js";

const LoginForm = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axiosInstance.post("login", formData)
      
      login(data.user)
     
      if (data.user.rol === "cliente") {
            Swal.fire(
              "¡Bienvenido!",
              `Inicio de sesión exitoso, bienvenido ${data.user.nombre}`,
              "success"
            );
            navigate(HOME);
          } else if (data.user.rol === "comercio") {
            Swal.fire(
              "¡Bienvenido!",
              `Inicio de sesión exitoso, bienvenido ${data.user.nombre_admin}, dueño de ${data.user.nombre_comercio}`,
              "success"
            );
          
            navigate(`/dashboard-vendedor/${data.user.id_comercio}`);
          } else if (data.user.rol === "repartidor") {
            Swal.fire(
              "¡Bienvenido!",
              `Inicio de sesión exitoso, bienvenido ${data.user.nombre}`,
              "success"
            );
            navigate(`/dashboard-repartidor/${data.user.id_repartidor}`);
          }

      
    } catch (error) {
      console.error("error trayendo los usuarios:", error);
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
