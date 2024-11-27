import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./registrousuario.css";
import imagen1 from "../assets/img/sala1.jpg";
import imagen2 from "../assets/img/sala2.jpg";
import imagen3 from "../assets/img/sala3.jpg";

const Registro = () => {
  const url = "http://localhost:5000/usuario";
  const [values, setValues] = useState({
    nombre: "",
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

  const handleForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      nombre: values.nombre,
      email: values.email,
      contrasena: values.password,
    };

    // Obtener usuarios del localStorage o inicializar un array vacío
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el correo ya está registrado
    const userExists = users.some((user) => user.email === values.email);

    if (userExists) {
      alert("El correo ya está registrado.");
      setIsLoading(false);
      return;
    }

    // Guardar nuevo usuario en localStorage
    users.push({
      nombre: values.nombre,
      email: values.email,
      password: values.password,
    });
    localStorage.setItem("users", JSON.stringify(users));

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Operación exitosa:", result);
        navigate("/inicio"); // Redirigir al inicio después de registrarse
      } else {
        console.error("Error al registrar el usuario:", result);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error al realizar la operación:", error);
      setIsLoading(false);
    }
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
        <h1>Registro nuevo usuario NIDO</h1>
        <form onSubmit={handleForm}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={values.nombre}
            onChange={controlarCambios}
            className="form-control"
            placeholder="Ingrese su nombre completo"
            required
          />
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
            placeholder="Ingresa la contraseña"
            required
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Enviar"}
          </button>
        </form>
        {isLoading && (
          <div className="loading-indicator">
            <p>Registrando...</p>
          </div>
        )}
        <p>
          ¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a>
        </p>
      </div>
      <div className="row2">
        <img
          src={images[currentImageIndex]}
          alt="Imagen de registro"
          className={`registro-img ${fade ? "fade-in" : "fade-out"}`}
        />
      </div>
    </div>
  );
};

export default Registro;
