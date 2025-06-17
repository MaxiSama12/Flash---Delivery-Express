import React, { useState, useEffect, useRef, } from "react";
import {
  FaUserCircle,
  FaBox,
  FaChevronDown,
  FaHome,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaSignInAlt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/logo.png";
import "../../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const dropdownRef = useRef();

  //desktop

  const { usuario, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  //////


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest(".dropdown-toggle")
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
  <>
    {/* 📱 NAVBAR MOBILE SUPERIOR CON CATEGORÍAS Y COMERCIOS */}
    <nav
      className="navbar fixed-top d-flex flex-column"
      style={{
        backgroundColor: "#56649C",
        padding: "0.5rem 1rem",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      {/* Botones arriba */}
      <div className="w-100 d-flex justify-content-around mb-2">

                  <NavLink
                    to="/comercios"
                    className={({ isActive }) =>
                      `btn btn-light w-50 mx-1${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <button className="btn">Comercios</button>
                    </NavLink>

                    {usuario && (
                    <button className="btn btn-light w-50 mx-1" onClick={handleLogout}>
                    <FiLogOut size={22} />
                    Cerrar sesión
                    </button>
                    )}

      </div>

    </nav>

    {/* 📱 BARRA INFERIOR FIJA */}
    <div
      className="fixed-bottom d-flex justify-content-around align-items-center"
      style={{
        backgroundColor: "#56649C",
        padding: "0.5rem 0",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
                  {!usuario ? (
                      <>
                      <p className="text-white d-flex flex-column align-items-center nav-item-hover"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/login")}
                      >
                      <FaSignInAlt size={22} />
                      Iniciar sesion
                    </p>


                    </>
                    ) : (

                    <Link to="/carrito" className="text-white d-flex flex-column align-items-center nav-item-hover">
                    <FaShoppingCart size={22} />
                    <small>Carrito</small>
                    </Link>

                    )}

                    <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-white d-flex flex-column align-items-center nav-item-hover ${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <FaHome size={22} />
                      <small>Inicio</small>
                    </NavLink>

                  {usuario && (
                  <NavLink
                    to="/mi-perfil"
                    className={({ isActive }) =>
                      `text-white d-flex flex-column align-items-center nav-item-hover ${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <FaUserCircle size={22} />

                      <span >
                      {usuario ? usuario.nombre : "Mi Perfil"}
                      </span>
                    </NavLink>
                    )}

                    {usuario &&(
                    <Link className="text-white d-flex flex-column align-items-center nav-item-hover" to="/mis-pedidos">
                    <FaBox size={22} />
                    <small>Mis Pedidos</small>
                    </Link>
                    )}


    </div>
  </>
) : (


  // 🖥️ NAVBAR DESKTOP ...
        <nav
          className="navbar fixed-top"
          style={{
            backgroundColor: "#56649C",
            padding: 0,
            zIndex: 1000,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Logo */}
            <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `navbar-brand text-white d-flex align-items-center ${
                    isActive ? "navbar-brand text-white d-flex align-items-center" : ""
                        }`
                      }
                    >
                        <img
                        src={logo}
                        alt="Logo"
                        style={{ height: "70px", marginRight: "10px" }}
                        />
                    </NavLink>

            {/* Centro con Categorías y Comercios */}
            <div className="d-flex gap-3">

                  <NavLink
                    to="/comercios"
                    className={({ isActive }) =>
                      `${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <button className="btn btn-light">Comercios</button>
                    </NavLink>

            </div>

            {/* Íconos y Dropdown */}
            <div className="position-relative">
        <div
          onClick={toggleMenu}
          className="d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
        >
            {usuario && (
            <Link to="/carrito" className="position-relative nav-item-hover d-flex align-items-center gap-1">
            <FaShoppingCart size={22} />
            </Link>
          )}
            <Link to="/mi-perfil" className="nav-item-hover d-flex align-items-center gap-1">
            <FaUserCircle size={22} />
            <span >
                {usuario ? usuario.nombre : "Mi Perfil"}
            </span>
            </Link>

          <FaChevronDown className="nav-item-hover d-flex align-items-center gap-1"/>
        </div>

        {showMenu && (
          <div className="position-absolute"
          style={{
                      top: "200%",
                      right: 0,
                      backgroundColor: "white",
                      borderRadius: "12px",
                      padding: "0.5rem 1rem",
                      marginTop: "0.5rem",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                      minWidth: "200px",
                      zIndex: 999,
                    }}
          >
            {!usuario ? (
              <>
                <p
                  className="dropdown-item mb-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </p>
              </>
            ) : (
              <>
                <p className="dropdown-item text-muted mb-3">
                  Hola, {usuario.nombre}
                </p>

                    <Link className="nav-item-hover dropdown-item text-muted d-flex align-items-center gap-2 mb-3" to="/mis-pedidos">
                    <FaBox size={22} />
                    <small>Mis Pedidos</small>
                    </Link>

                    <Link className="nav-item-hover dropdown-item text-muted d-flex align-items-center gap-2 mb-3" to="/mis-direcciones">
                    <FaMapMarkerAlt size={22} />
                    <small>Mis Direcciones</small>
                    </Link>

                    <button className="btn btn-outline-danger btn-sm w-100 mb-3" onClick={handleLogout}>
                    Cerrar sesión
                    </button>

              </>
            )}
          </div>
        )}
      </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;