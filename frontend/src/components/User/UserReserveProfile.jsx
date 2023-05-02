import React, { useEffect, useState } from "react";
import { useReserve } from "../../hooks/useReserve";
import "./User.scss";

export default function UserReserveProfile() {
    const { reserves, getReservesByUser } = useReserve();

    useEffect(() => {
        getReservesByUser();
    }, [])

    return (
        <>
            <h1>client</h1>
            <div className="">
                <table className="text-center table table-striped mb-0 table-dark">
                    <thead className="bord_thead">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Minutes</th>
                            <th scope="col">Cost</th>
                        </tr>
                    </thead>
                    <tbody className="align-baseline">
                        {reserves.map((reserve) => {
                            return (
                                <tr key={reserve.id}>
                                    <td>{new Date(new Date(reserve.date_ini).getTime() - (2 * 60 * 60 * 1000)).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</td>
                                    <td>{new Date(new Date(reserve.date_fin) - new Date(reserve.date_ini)).getMinutes()}</td>
                                    {/* <td>{reserve.bike}</td>
                                    {reserve.cost == 0 ?
                                        <>
                                            <td>Not finished</td>
                                            <td>
                                                <select name="" id="" className="bg-transpareserve" {...register("slot", { required: true })}>
                                                    {slots.map((slot) => {
                                                        return <option key={slot.id} value={slot.id} className="text-black">{slot.id} {slot.slug}</option>
                                                    })}
                                                </select>
                                                <button className="btn btn-primary" onClick={() => close(reserve)}>close reserve</button>
                                            </td>
                                        </>
                                        :
                                        <>
                                            <td>{reserve.cost + " €"}</td>
                                            <td>No options</td>
                                        </>
                                    } */}

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}


