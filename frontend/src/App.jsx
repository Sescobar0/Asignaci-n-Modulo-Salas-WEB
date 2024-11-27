// eslint-disable-next-line no-unused-vars
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./style.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Form,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Reservas from "./views/reservas";
import Registro from "./views/Registro";
import Inicio from "./views/Inicio";
import MisReservas from "./views/misReservas";
import CrearSala from "./components/form/CrearSala";
import CrearReserva from "./CrearReserva";
import Login from "./views/Login";

function App() {
  return (
    <Router>
      <NavBarWithLocation />
      <Routes>
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/crearReserva" element={<CrearReserva />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/crearSala" element={<CrearSala />} />
      </Routes>
    </Router>
  );
}

function NavBarWithLocation() {
  const location = useLocation();
  return (
    <>
      {/* Navbar solo se muestra si la ruta no es "/login" */}
      {location.pathname !== "/registro" && location.pathname !== "/login" && (
        <Navbar />
      )}
    </>
  );
}

export default App;
