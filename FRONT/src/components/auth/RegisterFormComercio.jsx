import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMERCIOS, RUBROS } from "../../endpoints/endpoints";
import axios from "axios";
import { LOGIN } from "../../router/route";

const RegisterFormComercio = () => {
  const [rubros, setRubros] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    activo: true,
    id_usuario: "",
    id_rubro: "",
    url_image: "",
  });

  const navigate = useNavigate();

  const getRubros = async () => {
    try {
      const res = await axios.get(RUBROS);
      setRubros(res.data);
    } catch (error) {
      console.log("Error trayendo los rubros: ", error);
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
      alert(`!Comercio Registrado!, ahora vamos a iniciar sesión`);
      console.log(formData);
      navigate(LOGIN);
    } catch (error) {
      console.log("Ocurrió un error registrando al cliente: ", error);
    }
  };

  return (
    <div>
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="registro-title">Registre aquí su comercio</h2>
        <label>
          Nombre del Comercio:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="registro-input"
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
        <br />
        <label>
          URL de la imagen:
          <input
            type="text"
            name="descripcion"
            value={formData.url_image}
            onChange={handleChange}
            className="registro-input"
          />
        </label>

        <br />
        <label>Rubro:</label>
        <br />
        <select
          name="id_rubro"
          value={formData.id_rubro}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un rubro</option>
          {rubros.map((rubro) => (
            <option key={rubro.id} value={rubro.id}>
              {rubro.nombre}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit" className="registro-button">
          Registrar comercio
        </button>
        <div className="text-center my-2"></div>
      </form>
    </div>
  );
};

export default RegisterFormComercio;
