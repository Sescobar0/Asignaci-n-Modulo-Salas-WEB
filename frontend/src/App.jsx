import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

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
