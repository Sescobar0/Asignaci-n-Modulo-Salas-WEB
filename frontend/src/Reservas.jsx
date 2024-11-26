import { useState } from "react";
import moment from 'moment';

const Reservas = () => {
    const url = "http://localhost:3000/reservas"; //corregir ruta
    const data = {reservas: "reserva"} //corregir header
    const [values, setValues] = useState({
        fechaInicio: "",
        fechaFinal: ""
    });

    // función para limitar la hora mínima para reservar
    const obtenerFechaMinima = () => {
        const hoy = moment();
        hoy.set('hour', 7);
        return hoy.format('YYYY-MM-DDTHH:mm');
    }

    // función para limitar la hora máxima para reservar
    const obtenerFechaMaxima = () => {
        const hoy = moment();
        hoy.set('hour', 16);
        return hoy.format('YYYY-MM-DDTHH:mm');
    }

    // función para settear los valores iniciales
    const controlarCambios = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // función para manejar cambios en el formulario y enviarlos a la DB
    const handleForm = (event) => {
        event.preventDefault();
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
                    console.error("Error al enviar el formulario", error.message))
                .then((response) => console.log("Operación exitosa:", response));
        } catch(error) {
            console.error("Error al enviar el formulario", error);
        }

    }

    return (
        <div className='container mt-4'>
            <h1>Registro de salas para la empresa NIDO</h1>
            <form onSubmit={handleForm}>
                <label>Fecha de inicio de la reserva</label>
                <input type='datetime-local' name="fechaInicio" value={values.fechaInicio} onChange={controlarCambios} className='form-control'
                    placeholder='Fecha de inicio' min={obtenerFechaMinima()} max={obtenerFechaMaxima()} required />
                <label>Fecha final de la reserva</label>
                <input type='datetime-local' name="fechaFinal" value={values.fechaFinal} onChange={controlarCambios} className='form-control' placeholder='Fecha de final' min={obtenerFechaMinima()} max={obtenerFechaMaxima()} required />
                <button type='submit' className="btn btn-primary">Enviar</button>
            </form>
        </div>
    )
}

export default Reservas;