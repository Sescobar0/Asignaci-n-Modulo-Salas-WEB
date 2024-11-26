import { useState } from "react"

const Usuario = () => {
    const url = "http://localhost/3000/usuario";
    const [values, setValues] = useState({
        nombre: "",
        email: "",
        password: ""
    });

    // función para settear los valores iniciales
    const controlarCambios = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // función para manejar cambios en el formulario y enviarlos a la DB
    const handleForm = (e) => {
        e.preventDefault();
        try {
            fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((res) => res.json())
                .catch((error) =>
                    console.error("Error al registar el usuario", error.message))
                .then((response) => console.log("Operación exitosa:", response));
        } catch (error) {
            console.error("Error al realizar la operación", error);
        }
    }

    return (
        <div className='container mt-4'>
            <h1>Registro nuevo usuario NIDO</h1>
            <form onSubmit={handleForm}>
                <label>Nombre</label>
                <input type='text' name="nombre" value={values.nombre} onChange={controlarCambios} className='form-control'
                    placeholder='Ingrese su nombre completo' required />
                <label>Correo electrónico</label>
                <input type='email' name="email" value={values.email} onChange={controlarCambios} className='form-control' 
                    placeholder='example@gmail.com' required />
                <label>Contraseña</label>
                <input type='password' name="password" value={values.password} onChange={controlarCambios} className='form-control' 
                    placeholder='Ingresa la contraseña' required />
                <button type='submit' className="btn btn-primary">Enviar</button>
            </form>
            <p>¿Ya tienes una cuenta? <a href="#">Iniciar Sesión</a></p>
        </div>
    )
}

export default Usuario;