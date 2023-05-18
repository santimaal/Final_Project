import React, { useEffect, useState } from "react";
import { useReserve } from "../../hooks/useReserve";
import "./User.scss";

export default function UserAdminProfile() {
    const { reserves, setReserves, getReserves, updateReserve } = useReserve();

    useEffect(() => {
        getReserves()
    }, [])


    const updateReserves = (id, status) => {
        const updatedReserves = reserves.map(reserve => {
            if (reserve.id === id) {
                return {
                    ...reserve,
                    status: status
                };
            } else {
                return reserve;
            }
        });
        setReserves(updatedReserves)
    }

    return (
        <>
            <div className="">
                <table className="text-center table table-striped mb-0 table-dark">
                    <thead className="bord_thead">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">User</th>
                            <th scope="col">Field</th>
                            <th scope="col">Date</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody className="align-baseline">
                        {reserves.map((reserve, id) => {
                            return (
                                <tr key={id}>
                                    <td>{reserve.id}</td>
                                    <td>{reserve.user}</td>
                                    <td>{reserve.field}</td>
                                    <td>{new Date(new Date(reserve.date_ini).getTime() - (2 * 60 * 60 * 1000)).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</td>
                                    {reserve.status === 'pending' ? (
                                        <td className="flex justify-center gap-x-2">
                                            <button onClick={(e) => { updateReserve({ id: reserve.id, status: 'accepted' }); updateReserves(reserve.id, 'accepted') }} className="btn btn-outline-success flex rounded-full">✓</button>
                                            <button onClick={(e) => { updateReserve({ id: reserve.id, status: 'denied' }); updateReserves(reserve.id, 'denied') }} className="btn btn-outline-danger flex rounded-full">X</button>
                                        </td>
                                    ) :
                                        <td>{reserve.status}</td>
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}


