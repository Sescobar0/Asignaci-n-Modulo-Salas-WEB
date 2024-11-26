import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css';
import './style.css';
import Salones from './salones';


function App() {
  
  const obtenerFechaMinima = () => {
    const hoy = new Date();
    hoy.setHours(8, 0, 0, 0); //Establece la hora a las 8:00
    return hoy.toISOString().slice(0, 16);
  }

  const obtenerFechaMaxima = () => {
    const hoy = new Date();
    hoy.setHours(16, 0, 0, 0); //Establece la hora a las 16:00
    return hoy.toISOString().slice(0, 16);
  }

  return (
    <>
    {/* navbar */}
      <header className="main-header">
      <nav className="navbar header-nav navbar-expand-lg">
        <div className="container">
          {/* Logo */}
          <a href="#" className="navbar-brand">
            <img src="src/assets/img/logo.png" height="100px" className="rounded-pill" alt="logo" />
          </a>

          {/* Menu */}
          <div className="collapse navbar-collapse justify-content-end" id="navbar-collapse-toggle">
            <ul className="navbar-nav mx-auto">
              <li>
                <a href="#" className="nav-link">
                  Inicio
                </a>
              </li>
              <li className="ms-5">
                <a href="#" className="nav-link">
                  Reservas
                </a>
              </li>
              <li className="ms-5">
                <a href="#" className="nav-link">
                  Mis reservas
                </a>
              </li>
            </ul>
          </div>

          {/* Botones */}
          <div className="ms-auto me-2 d-none d-lg-block">
            <a className="color-btn" href="contacto.html">
              INICIO SESION
            </a>
          </div>

          <div className="ms-auto d-none d-lg-block">
            <a className="color-btn" href="contacto.html">
              REGISTRO
            </a>
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

    <Salones/>

      {/* formulario */}
      <div className='container mt-4'>
        <h1>Registro de salas para la empresa NIDO</h1>
        <input type='email' className='form-control' placeholder='Usuario_ID' required/>
        <input type='number' className='form-control' placeholder='Sala_ID' min={1} max={1} required/>
        <label>Fecha de inicio de la reserva</label>
        <input type='datetime-local' className='form-control' placeholder='Fecha de inicio' min={obtenerFechaMinima()} max={obtenerFechaMaxima()} required/>
        <label>Fecha de final de la reserva</label>
        <input type='datetime-local' className='form-control' placeholder='Fecha de final' min={obtenerFechaMinima()} max={obtenerFechaMaxima()} required/>
        <button type='submit' class="btn btn-primary">Enviar</button>        
      </div>
      
    </>
  )
}

export default App

