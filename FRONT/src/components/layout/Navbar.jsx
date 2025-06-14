import React, { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaBox,
  FaSearch,
  FaChevronDown,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import "../../styles/navbar.css"

const Navbar = () => {
  const [showSearchDesktop, setShowSearchDesktop] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const desktopSearchRef = useRef();
  const dropdownRef = useRef();

  // Detecta clics afuera para cerrar menús
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target) &&
        !e.target.closest(".search-toggle-desktop")
      ) {
        setShowSearchDesktop(false);
      }

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

  // Detecta redimensionamiento de pantalla
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
          {/* 📱 NAVBAR MOBILE SUPERIOR */}
          <nav
            className="navbar fixed-top"
            style={{
              backgroundColor: "#56649C",
              padding: "0.5rem 1rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              style={{ width: "100%" }}
            />
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
            <a
              href="#"
              className="text-white d-flex flex-column align-items-center nav-item-hover"
              style={{ textDecoration: "none" }}
            >
              <FaUserCircle size={22} />
              <small>Perfil</small>
            </a>
            <a
              href="#"
              className="text-white d-flex flex-column align-items-center nav-item-hover"
              style={{ textDecoration: "none" }}
            >
              <FaBox size={22} />
              <small>Pedidos</small>
            </a>

            <a
              href="#"
              className="text-white d-flex flex-column align-items-center nav-item-hover"
              style={{ textDecoration: "none" }}
            >
            <FaHome size={22} />
            <small>Inicio</small>
            </a>

          </div>
        </>
      ) : (
        // 🖥️ NAVBAR DESKTOP
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
            <a
              className="navbar-brand text-white d-flex align-items-center"
              href="#"
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: "70px", marginRight: "10px" }}
              />
            </a>

            {/* Menú desktop */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              <div ref={desktopSearchRef}>
                {showSearchDesktop && (
                  <input
                    type="text"
                    className="form-control nav-item-hover"
                    placeholder="Buscar..."
                    style={{ maxWidth: "200px" }}
                  />
                )}
              </div>
              <a href="#" className="nav-item-hover search-toggle-desktop">
                <FaSearch
                  color="white"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setShowSearchDesktop(!showSearchDesktop)
                  }
                />
              </a>

              <a
                href="#"
                className="nav-item-hover d-flex align-items-center gap-1"
              >
                <FaUserCircle size={24} />
                Mi Perfil
              </a>

              {/* Dropdown */}
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
                    <a
                      href="#"
                      className="nav-item-hover text-white d-flex align-items-center gap-2 mb-3"
                    >
                      <FaBox /> Mis Pedidos
                    </a>


                    <a
                      href="#"
                      className="nav-item-hover text-white d-flex align-items-center gap-2 mb-3"
                    >
                      <FaHome size={22} />
                      <small>Inicio</small>
                    </a>

                    <a
                      href="#"
                      className="nav-item-hover text-white d-flex align-items-center gap-2 mb-3"
                    >
                      <FaMapMarkerAlt size={22} />
                      <small>Mis Direcciones</small>
                    </a>
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