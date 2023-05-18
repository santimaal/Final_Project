import React, { useState, useEffect } from 'react';
import { useReserve } from '../../hooks/useReserve';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';


export default function ReserveModal({ data = null }) {
    const [selectedTime, setSelectedTime] = useState('hour');
    const [hAvlable, sethAvlable] = useState([]);
    const { reserves, setReserves, getReservesByField, createReserve } = useReserve()
    const [datevalue, setDatevalue] = useState(new Date().toISOString())
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    let timeToCompare = new Date(`2000-01-01T${selectedTime}:00.000Z`);

    const generateTimeOptions = async (date = new Date().toISOString().slice(0, 10)) => {
        let reserves = await getReservesByField(data.id, date);
        const timeOptions = [];
        for (let hour = 8; hour < 21; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                timeOptions.push(timeString);
            }
        }

        for (let row of reserves) {
            let dateIni = new Date(row.date_ini);
            let dateFin = new Date(row.date_fin);
            dateIni.setHours(dateIni.getHours() - 2);
            dateFin.setHours(dateFin.getHours() - 2);
            dateFin.setMinutes(dateFin.getMinutes() - 30);

            for (let i = 0; i < timeOptions.length; i++) {
                const time = timeOptions[i];
                const [hour, minute] = time.split(':');

                const currentDate = new Date(date);
                currentDate.setHours(hour, minute, 0);

                if (currentDate >= dateIni && currentDate <= dateFin) {
                    timeOptions.splice(i, 1);
                    i--;
                }
            }
        }
        sethAvlable(timeOptions);
    }

    const reserve = () => {
        if (!getValues().fechavalue || selectedTime === 'hour') {
            toast.error('Hour is required')
        } else {
            createReserve({
                field: data.id,
                date_ini: new Date(getValues().fechavalue + 'T' + selectedTime + ':00.000Z').toISOString(),
                date_fin: new Date(new Date(getValues().fechavalue + 'T' + selectedTime + ':00.000Z').getTime() + 30 * 60 * 1000).toISOString()
            })
        }
    }

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
                    <div className="modal-body flex justify-around">
                        {/* <input type="date" name="" id="" className='text-center' defaultValue={new Date().toISOString().split('T')[0]} min={new Date().toISOString().slice(0, 10)} onChange={(e) => generateTimeOptions(e.target.value)}  {...register("fechavalue", { required: true })} /> */}

                        <input
                            type="date"
                            name="fechavalue"
                            id="fechavalue"
                            className="text-center"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            min={new Date().toISOString().slice(0, 10)}
                            {...register('fechavalue', { required: true })}
                            onChange={(e)=> generateTimeOptions(e.target.value)}
                        />

                        <select id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value == 'hour' ? null : e.target.value)}>
                            <option value="hour" hidden>Hour</option>
                            {
                                hAvlable.map((item, id) => {
                                    return <option key={id} value={item}>{item}</option>
                                })
                            }
                        </select>
                        {selectedTime !== 'hour' && (
                            <select name="" id="">
                                <option value="30">30m</option>
                                {/* <                      {hAvlable.includes(
                                    new Date(timeToCompare.getTime() + (60 * 60 * 1000))
                                        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                ) && (
                                        <option value="60">1h</option>
                                    )}> */}
                            </select>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="modal-reserve-btn" data-bs-dismiss="modal" className="btn btn-primary" onClick={reserve}>Reserve Now!</button>
                    </div>
                </div>
            </div>
        </div >
    )
}