import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./registrousuario.css";
import imagen1 from "../assets/img/sala1.jpg";
import imagen2 from "../assets/img/sala2.jpg";
import imagen3 from "../assets/img/sala3.jpg";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true); // Estado para controlar la clase de fade
  const navigate = useNavigate();

  const images = [imagen1, imagen2, imagen3];

  const controlarCambios = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Obtener usuarios de localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar el usuario en el localStorage
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    setTimeout(() => {
      if (user) {
        // Si el usuario existe y la contraseña es correcta, guardar al usuario logueado
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redirigir a la página de inicio
        navigate("/inicio");
      } else {
        // Si no se encuentra el usuario o la contraseña es incorrecta
        alert("Correo o contraseña incorrectos");
      }

      setIsLoading(false); // Después de los 2 segundos, detener el indicador de carga
    }, 2000); // 2 segundos de espera
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // Comienza la transición
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Cambia al siguiente índice
        setFade(true); // Restaura la visibilidad
      }, 500); // Duración de la transición
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="row1">
      <div className="registro">
        <h1>Iniciar sesión NIDO</h1>
        <form onSubmit={handleLogin}>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={controlarCambios}
            className="form-control"
            placeholder="example@gmail.com"
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={controlarCambios}
            className="form-control"
            placeholder="Ingresa tu contraseña"
            required
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
        {isLoading && (
          <div className="loading-indicator">
            <p>Iniciando sesión...</p>
          </div>
        )}
        <p>
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </div>
      <div className="row2">
        <img
          src={images[currentImageIndex]}
          alt="Imagen de inicio de sesión"
          className={`registro-img ${fade ? "fade-in" : "fade-out"}`}
        />
      </div>
    </div>
  );
};

export default Login;
