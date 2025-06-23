import React, { useState, useEffect, useRef } from "react";
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
import logo from "../../assets/image.png";
import "../../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const dropdownRef = useRef();
  const toggleRef = useRef(); // 👈 nueva referencia

  const { usuario, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
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
      console.log("usuario en Nav",usuario)
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <div
          className="position-fixed fixed-top d-flex justify-content-around align-items-center"
          style={{
            backgroundColor: "#f6f6f6",
            padding: "1rem 0",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
            zIndex: 1000,
            position: "relative",
          }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `mobile-nav-item d-flex flex-column align-items-center link-comercio ${
                isActive ? "active fw-bold" : ""
              }`
            }
          >
            <FaHome size={22} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/comercios"
            className={({ isActive }) =>
              `mobile-nav-item d-flex flex-column align-items-center link-comercio ${isActive ? "active fw-bold" : ""}`
            }
          >
            <FaMapMarkerAlt size={22} />
            <span>Comercios</span>
          </NavLink>

          {usuario ? (
            <div className="position-relative">
              <div
                className="mobile-nav-item d-flex flex-column align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => setDropdownOpen((prev) => !prev)}
                ref={toggleRef} // 👈 referencia aplicada
              >
                <FaUserCircle size={22} />
                <span>{usuario.nombre}</span>
              </div>

              {dropdownOpen && (
                <div ref={dropdownRef} className="mobile-dropdown">
                  <Link
                    to="/mis-pedidos"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaBox size={18} />
                    Mis Pedidos
                  </Link>

                  <Link
                    to="/mis-direcciones"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaMapMarkerAlt size={18} />
                    Mis Direcciones
                  </Link>

                  <button onClick={handleLogout}>
                    <FiLogOut size={18} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="mobile-nav-item d-flex flex-column align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              <FaSignInAlt size={22} />
              <span>Ingresar</span>
            </div>
          )}
        </div>
      ) : (
        <nav
          className="navbar fixed-top d-flex flex-column"
          style={{
            backgroundColor: "#f6f6f6",
            padding: 10,
            zIndex: 1000,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div className="container-fluid d-flex justify-content-around align-items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navbar-brand mx-0 text-dark d-flex align-items-center ${
                  isActive
                    ? "navbar-brand text-dark d-flex align-items-center"
                    : ""
                }`
              }
            >
              <img src={logo} alt="Logo" style={{ height: "40px" }} />
            </NavLink>

            <div className="d-flex gap-3">
              <NavLink
                to="/comercios"
                className={({ isActive }) =>
                  `${isActive ? "active fw-bold link-comercio" : "link-comercio"}`
                }
              >
                Comercios
              </NavLink>
            </div>
<div className="position-relative">
              <div
                className="d-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}
              >

                {!usuario ? (
                  <div
                    className="nav-item-hover d-flex align-items-center gap-1"
                    onClick={toggleMenu}
                  >
                  <FaUserCircle size={22} />
                  <span>Mi Perfil</span>
                  <FaChevronDown className={`nav-item-hover chevron-rotate ${showMenu ? "open" : ""}`}/>
                  </div>
                ) : (
                  <>
                  <Link
                    to="/mi-perfil"
                    className="nav-item-hover d-flex align-items-center gap-1"
                  >
                  <FaUserCircle size={22} />
                  <span>{usuario ? usuario.nombre : "Mi perfil"}</span>
                </Link>

                  <FaChevronDown
                    className={`nav-item-hover chevron-rotate ${showMenu ? "open" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={toggleMenu}
                  />

                  </>
                )}
                </div>

              {showMenu && (
                <div
                  className="position-absolute"
                  style={{
                    top: "110%",
                    right: 0,
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "0.5rem 1rem",
                    marginTop: "0.2rem",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    minWidth: "200px",
                    zIndex: 999,
                  }}
                >
                  {!usuario ? (
                    <p
                      className="dropdown-item mb-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/login")}
                    >
                      Iniciar sesión
                    </p>
                  ) : (
                    <>
                      <p className="dropdown-item text-muted mb-3">
                        Hola, {usuario.nombre}
                      </p>

                      <Link
                        className="nav-item-hover dropdown-item text-muted d-flex align-items-center gap-2 mb-3"
                        to="/mis-pedidos"
                      >
                        <FaBox size={22} />
                        <small>Mis Pedidos</small>
                      </Link>

                      <Link
                        className="nav-item-hover dropdown-item text-muted d-flex align-items-center gap-2 mb-3"
                        to="/mis-direcciones"
                      >
                        <FaMapMarkerAlt size={22} />
                        <small>Mis Direcciones</small>
                      </Link>

                      <button
                        className="btn btn-outline-danger btn-sm w-100 mb-3"
                        onClick={handleLogout}
                      >
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
