import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Reservas from './Reservas';
import Usuario from './Usuario';

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
      <nav className='navbar navbar-expan-lg navbar-light bg-light'>
        <a className='navbar-brand' href='#'>NIDO</a>
        <a className='navbar-brand' href='#'>Inicio</a>
        <a className='navbar-brand' href='#'>Reservas</a>
      </nav>
      <Reservas />
      <Usuario />
    </>
  )
}

export default App
