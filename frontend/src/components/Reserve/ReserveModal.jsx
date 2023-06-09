import React, { useState, useEffect } from 'react';
import { useReserve } from '../../hooks/useReserve';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';


export default function ReserveModal({ data = null }) {
    const [selectedTime, setSelectedTime] = useState('hour');
    const [hAvlable, sethAvlable] = useState([]);
    const { getReservesByField, createReserve } = useReserve()
    const [datevalue, setDatevalue] = useState(new Date().toISOString())
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

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
        <div className="modal fade" id={`exampleModal${data.slug}`} tabIndex="-1"
            data-backdrop="static"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{data.slug}</h5>
                        <button type="button" className="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body flex justify-around">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="date" className="col-sm-2 hd:row-form-label col-form-label font-bold">Date</label>
                                <div className="col-sm-10">
                                    <input
                                        type="date"
                                        name="fechavalue"
                                        id="fechavalue"
                                        className="hd:text-end form-control-plaintext"
                                        defaultValue={new Date().toISOString().split('T')[0]}
                                        min={new Date().toISOString().slice(0, 10)}
                                        {...register('fechavalue', { required: true })}
                                        onChange={(e) => generateTimeOptions(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="hour" className="col-sm-2 col-form-label font-bold">Hour</label>
                                <div className="col-sm-10">
                                    <select id="time" className='form-control-plaintext hd:text-end'
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value == 'hour' ? null : e.target.value)}>
                                        <option value="hour" hidden>Hour</option>
                                        {
                                            hAvlable.map((item, id) => {
                                                return <option key={id} value={item}>{item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            {selectedTime !== 'hour' && (
                                <div className="form-group row">
                                    <label htmlFor="time" className="col-sm-2 col-form-label font-bold">Time</label>
                                    <div className="col-sm-10">
                                        <select className='form-control-plaintext hd:text-end' id="time">
                                            <option value="30">30m</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                            data-bs-dismiss="modal">Close</button>
                        <button type="button" id="modal-reserve-btn"
                            data-bs-dismiss="modal" className="btn btn-primary"
                            onClick={reserve}>Reserve Now!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}