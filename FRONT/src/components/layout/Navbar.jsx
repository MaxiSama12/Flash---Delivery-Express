import React, { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaBox,
  FaChevronDown,
  FaHome,
  FaMapMarkerAlt,
  FaShoppingCart,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import "../../styles/navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const dropdownRef = useRef();

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
                    to="/categorias"
                    className={({ isActive }) =>
                      `btn btn-light w-50 mx-1${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <button className="btn">Categorías</button>
                    </NavLink>


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
                  <NavLink
                    to="/mi-perfil"
                    className={({ isActive }) =>
                      `text-white d-flex flex-column align-items-center nav-item-hover ${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <FaUserCircle size={22} />
                      <small>Perfil</small>
                    </NavLink>

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



                    <NavLink
                    to="/mis-pedidos"
                    className={({ isActive }) =>
                      `text-white d-flex flex-column align-items-center nav-item-hover ${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <FaBox size={22} />
                      <small>Pedidos</small>
                    </NavLink>

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
            <a className="navbar-brand text-white d-flex align-items-center" href="#">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "70px", marginRight: "10px" }}
              />
            </a>

            {/* Centro con Categorías y Comercios */}
            <div className="d-flex gap-3">



              <NavLink
                    to="/categorias"
                    className={({ isActive }) =>
                      `${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <button className="btn btn-light">Categorías</button>
                    </NavLink>


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
            <div className="d-none d-lg-flex align-items-center gap-3">

              <NavLink
                    to="/carrito"
                    className={({ isActive }) =>
                      `nav-item-hover d-flex align-items-center gap-1 ${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <FaShoppingCart size={22} />
                    </NavLink>


                  <NavLink
                    to="/mi-perfil"
                    className={({ isActive }) =>
                      `nav-item-hover d-flex align-items-center gap-1 ${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <FaUserCircle size={22} />
                      <small>Mi Perfil</small>
                    </NavLink>

              <div className="position-relative" ref={dropdownRef}>
                <button
                  className="btn text-white d-flex align-items-center gap-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{ background: "transparent", border: "none" }}
                >
                  <FaChevronDown />
                </button>
                {dropdownOpen && (
                  <div
                    className="position-absolute"
                    style={{
                      top: "200%",
                      right: 0,
                      backgroundColor: "#56649C",
                      borderRadius: "12px",
                      padding: "0.5rem 1rem",
                      marginTop: "0.5rem",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                      minWidth: "200px",
                      zIndex: 999,
                    }}
                  >



                    <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `nav-item-hover text-white d-flex align-items-center gap-2 mb-3 ${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <FaHome size={22} />
                      <small>Inicio</small>
                    </NavLink>



                    <NavLink
                    to="/mis-pedidos"
                    className={({ isActive }) =>
                      `nav-item-hover text-white d-flex align-items-center gap-2 mb-3 ${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <FaBox size={22} />
                      <small>Mis Pedidos</small>
                    </NavLink>


                    <NavLink
                    to="/mis-direcciones"
                    className={({ isActive }) =>
                      `nav-item-hover text-white d-flex align-items-center gap-2 mb-3 ${
                    isActive ? "fw-bold" : ""
                        }`
                      }
                    >
                      <FaMapMarkerAlt size={22} />
                      <small>Mis Direcciones</small>
                    </NavLink>

                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;