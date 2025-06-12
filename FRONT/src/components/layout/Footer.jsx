import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-white mt-5"
      style={{
        backgroundColor: "#56649C",
        padding: "2rem 0",
      }}
    >
      <div className="container text-center">
        <div className="row">
          {/* Columna 1 - Logo y nombre */}
          <div className="col-md-4 mb-3">
            <h4 style={{ color: "#343C58" }}>FlashExpress</h4>
            <p style={{ fontSize: "0.9rem" }}>
              Envíos rápidos, seguros y eficientes.
            </p>
          </div>

          {/* Columna 2 - Links rápidos */}
          <div className="col-md-4 mb-3">
            <h6 style={{ color: "#343C58" }}>Navegación</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Inicio</a></li>
              <li><a href="#" className="text-white text-decoration-none">Servicios</a></li>
              <li><a href="#" className="text-white text-decoration-none">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3 - Contacto */}
          <div className="col-md-4 mb-3">
            <h6 style={{ color: "#343C58" }}>Contacto</h6>
            <p style={{ fontSize: "0.9rem" }}>
              Email: info@flashexpress.com <br />
              Tel: +54 381 123 4567
            </p>
          </div>
        </div>

        <hr style={{ backgroundColor: "#583445" }} />

        <p className="mt-3" style={{ fontSize: "0.8rem" }}>
          © {new Date().getFullYear()} FlashExpress. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}