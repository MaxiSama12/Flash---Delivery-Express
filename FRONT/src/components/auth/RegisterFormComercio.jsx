import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { COMERCIOS, RUBROS } from "../../endpoints/endpoints";
import axios from "axios";
import { LOGIN } from "../../router/route";
import Swal from "sweetalert2"; // ✅ Importación de SweetAlert2

const RegisterFormComercio = () => {
  const [rubros, setRubros] = useState([]);
  const [formData, setFormData] = useState({
    nombre_comercio: "",
    direccion: "",
    telefono: "",
    activo: true,
    url_imagen: "",
    rating: "",
    time: "",
    id_rubro: "",
    nombre_usuario: "",
    email: "",
    password: "",
    rol: "comercio",
  });

  const navigate = useNavigate();

  const getRubros = async () => {
    try {
      const res = await axios.get(RUBROS);
      setRubros(res.data);
    } catch (error) {
      console.log("Error trayendo los rubros: ", error);
      Swal.fire("Error", "No se pudieron cargar los rubros", "error");
    }
  };

  useEffect(() => {
    getRubros();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(COMERCIOS, formData);
      Swal.fire(
        "¡Comercio Registrado!",
        "Ahora vamos a iniciar sesión.",
        "success"
      );
      console.log(formData);
      navigate(LOGIN);
    } catch (error) {
      console.log("Ocurrió un error registrando el comercio: ", error);
      Swal.fire(
        "Error",
        "Hubo un problema al registrar el comercio. Intenta nuevamente.",
        "error"
      );
    }
  };

  return (
    <div className="container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="registro-title">Registre aquí su comercio</h2>

        <label>
          Nombre del Comercio:
          <input
            type="text"
            name="nombre_comercio"
            value={formData.nombre_comercio}
            onChange={handleChange}
            className="registro-input"
            required
          />
        </label>

        <label>
          Direccion:
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
          URL de la imagen:
          <input
            type="text"
            name="url_imagen"
            value={formData.url_imagen}
            onChange={handleChange}
            className="registro-input"
            required
          />
        </label>

        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="registro-input"
            required
          />
        </label>

        <label>
          Tiempo de demora en despachar pedidos:
          <input
            type="text"
            name="time"
            value={formData.time}
            placeholder="Por ejemplo: '20 - 40 min'"
            onChange={handleChange}
            className="registro-input"
          />
        </label>

        <label>Rubro:</label>
        <select
          name="id_rubro"
          value={formData.id_rubro}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un rubro</option>
          {rubros.map((rubro) => (
            <option key={rubro.id} value={rubro.id}>
              {rubro.nombre_rubro}
            </option>
          ))}
        </select>

        <h4>Registre los datos del Administrador:</h4>

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

        <button type="submit" className="registro-button">
          Registrar comercio
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

export default RegisterFormComercio;
