import React from "react";
import { FaUserCircle, FaShoppingCart, FaBox, FaSearch } from "react-icons/fa";
import useCartStore from '../../store/cartStore';
import logo from '../../assets/logo2.png';
import { useSearchStore } from '../../store/searchStore';


const Navbar = () => {
  const { cartCount } = useCartStore();
  const { isVisible, toggleSearch } = useSearchStore();

  return (
    <nav className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: "#56649C",
        padding: "1rem 2rem",
        zIndex: "1000",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)", }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <a className="navbar-brand text-white d-flex align-items-center" href="#">
          <img src={logo} alt="Logo" style={{ height: "80px", marginRight: "10px" }} />
          Flash Delivery Express
        </a>

        {/* Iconos */}
        <div className="d-flex align-items-center gap-3">
          {/* Buscador */}
          {isVisible && (
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              style={{ maxWidth: "200px" }}
            />
          )}
          <FaSearch onClick={toggleSearch} color="white" style={{ cursor: "pointer" }} />
          {/* Pedidos */}
          <a href="#" className="text-light text-decoration-none d-flex align-items-center gap-1">
            <FaBox /> <span>Mis Pedidos</span>
          </a>

          {/* Carrito */}
          <a href="#" className="position-relative text-light text-decoration-none">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {cartCount}
              </span>
            )}
          </a>

          {/* Perfil */}
          <a href="#" className="text-light">
            <FaUserCircle size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;