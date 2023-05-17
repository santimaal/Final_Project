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
            <div className="">
                <table className="text-center table table-striped mb-0 table-dark">
                    <thead className="bord_thead">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Minutes</th>
                            <th scope="col">Field</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody className="align-baseline">
                        {reserves && reserves.length > 0 ? (
                            reserves.map((reserve) => {
                                return (
                                    <tr key={reserve.id}>
                                        <td>{new Date(new Date(reserve.date_ini).getTime() - (2 * 60 * 60 * 1000)).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</td>
                                        <td>{new Date(new Date(reserve.date_fin) - new Date(reserve.date_ini)).getMinutes()}</td>
                                        <td>{reserve.field}</td>
                                        <td>{reserve.status}</td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No reserves yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}


