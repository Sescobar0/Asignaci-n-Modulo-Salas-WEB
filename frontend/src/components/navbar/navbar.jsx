// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom"; // Importar Link de React Router

function Navbar() {
  return (
    <>
      <header className="main-header">
        <nav className="navbar header-nav navbar-expand-lg">
          <div className="container">
            {/* Logo */}
            <Link to="/" className="navbar-brand">
              {" "}
              {/* Cambiar a Link */}
              <img
                src="src/assets/img/image.png"
                height="100px"
                className="rounded-pill"
                alt="logo"
              />
            </Link>

            {/* Menu */}
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbar-collapse-toggle"
            >
              <ul className="navbar-nav mx-auto">
                <li>
                  <Link to="/" className="nav-link">
                    {" "}
                    {/* Cambiar a Link */}
                    Inicio
                  </Link>
                </li>
                <li className="ms-5">
                  <Link to="/reservas" className="nav-link">
                    {" "}
                    Reservas
                  </Link>
                </li>
                <li className="ms-5">
                  <Link to="/mis-reservas" className="nav-link">
                    {" "}
                    {/* Cambiar a Link */}
                    Mis reservas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Botones */}
            <div className="ms-auto me-2 d-none d-lg-block">
              <Link className="color-btn" to="/registro">
                {" "}
                {/* Cambiar a Link */}
                INICIO SESION
              </Link>
            </div>

            <div className="ms-auto d-none d-lg-block">
              <Link className="color-btn" to="/login">
                {" "}
                {/* Cambiar a Link */}
                REGISTRO
              </Link>
            </div>

            {/* Botón desplegable */}
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-collapse-toggle"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
