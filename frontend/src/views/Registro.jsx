import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "./registro.css";

const Registro = () => {
  const url = "http://localhost:5000/usuario"; // Asegúrate de que la URL esté correcta
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Inicializamos el hook para la navegación

  // Función para manejar cambios en los inputs
  const controlarCambios = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleForm = async (e) => {
    e.preventDefault();

    // Preparamos los datos para enviar
    const data = {
      nombre: values.nombre,
      email: values.email,
      contrasena: values.password,
    };

    try {
      // Enviamos los datos al backend con fetch
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Procesamos la respuesta
      const result = await response.json();

      if (response.ok) {
        console.log("Operación exitosa:", result);

        // Redirigimos a la página /reservas después de un registro exitoso
        navigate("/reservas");
        console.log("Redirigiendo a /reservas");
      } else {
        console.error("Error al registrar el usuario:", result);
      }
    } catch (error) {
      console.error("Error al realizar la operación:", error);
    }
  };

  return (
    <div className="container mt-4 registro">
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
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <a href="#">Iniciar Sesión</a>
      </p>
    </div>
  );
};

export default Registro;
