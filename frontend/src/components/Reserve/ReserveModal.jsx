import React, { useState, useEffect } from 'react';


export default function ReserveModal({ data = null }) {
    const [selectedTime, setSelectedTime] = useState('hour');
    const [hAvlable, sethAvlable] = useState([]);

    // Función para generar las opciones de tiempo en intervalos de 30 minutos
    const generateTimeOptions = () => {
        const timeOptions = [];
        for (let hour = 8; hour <= 21; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                // Convertir el tiempo en una cadena con el formato "hh:mm"
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                // Agregar la opción al array
                timeOptions.push(timeString);
            }
        }
        sethAvlable(timeOptions.filter((hour) => {
            return !['10:00', '11:00', '21:30'].includes(hour)
        }))
    }

    // Llamar a la función para generar las opciones de tiempo al montar el componente
    useEffect(() => {
        if (data != null) generateTimeOptions();
    }, []);

    return (
        <div className="modal fade" id={`exampleModal${data.slug}`} tabIndex="-1" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{data.slug}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <select id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value == 'hour' ? null : e.target.value)}>
                            <option value="hour" hidden>Hour</option>
                            {
                                hAvlable.map((item, id) => {
                                    return <option key={id} value={item}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}