import React from "react";
import { FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer-demierda">
      <footer
        className="text-white text-center py-4 d-none d-lg-block "
        style={{ backgroundColor: "#9c5698" }}
      >
        <div className="container">
          <div className="row justify-content-center gap-4">
            <div className="col-auto">
              <a
                href="#"
                className="text-white d-flex align-items-center gap-2 nav-item-hover"
                style={{ textDecoration: "none" }}
              >
                <FaInfoCircle />
                <span>Sobre Nosotros</span>
              </a>
            </div>
            <div className="col-auto">
              <a
                href="#"
                className="text-white d-flex align-items-center gap-2 nav-item-hover"
                style={{ textDecoration: "none" }}
              >
                <FaPhoneAlt />
                <span>Contáctenos</span>
              </a>
            </div>
            <div className="col-auto">
              <a
                href="https://maps.app.goo.gl/gtDeXKn6GEpMkdZPA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white d-flex align-items-center gap-2 nav-item-hover"
                style={{ textDecoration: "none" }}
              >
                <FaMapMarkerAlt />
                <span>Ubicación</span>
              </a>
            </div>
          </div>

          <hr style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
          <p className="mb-0">
            © {new Date().getFullYear()} Flash Express. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
