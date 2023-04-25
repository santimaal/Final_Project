import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import ReserveService from "../services/ReserveService";
import AuthContextProvider from '../context/AuthContext';
import { toast } from 'react-toastify';

export function useReserve() {
    const [reserves, setReserves] = useState([])

    const getReservesByField = useCallback(async (id, date) => {
        let rtrn = []
        await ReserveService.getReservesByField(id, date)
            .then(({ data }) => {
                setReserves(data);
                rtrn = data
            })
        return rtrn
    }, [setReserves]);

    const createReserve = useCallback(async (date) => {
        console.log(date)
        await ReserveService.createReserve(date)
            .then(({ data }) => {
                console.log(data)
            })
    })

    return { getReservesByField, reserves, setReserves, createReserve }
}