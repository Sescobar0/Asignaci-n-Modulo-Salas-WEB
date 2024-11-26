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
} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Reservas from "./views/reservas";
import Registro from "./views/Registro";

function App() {
  return (
    <Router>
      <NavBarWithLocation />
      <Routes>
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/login" element={<Registro />} />
      </Routes>
    </Router>
  );
}

function NavBarWithLocation() {
  const location = useLocation();
  return (
    <>
      {/* Navbar solo se muestra si la ruta no es "/login" */}
      {location.pathname !== "/login" && <Navbar />}
    </>
  );
}

export default App;
