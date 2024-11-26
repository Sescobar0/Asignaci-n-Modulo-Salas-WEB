// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom"; // Importar Link de React Router
import "../navbar/navStyle.css";

function Navbar() {
  return (
    <>
      <header className="main-header">
        <nav className="navbar header-nav navbar-expand-lg">
          <div className="container">
            {/* Logo */}
            <Link className="navbar-brand">
              {" "}
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
                  <Link to="/inicio" className="nav-link">
                    {" "}
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
                    Mis reservas
                  </Link>
                </li>
              </ul>
            </div>

            <div className="ms-auto d-none d-lg-block">
              <Link className="color-btn" to="/login">
                {" "}
                REGISTRO
              </Link>
            </div>

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
