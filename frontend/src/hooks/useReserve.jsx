import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import ReserveService from "../services/ReserveService";
import AuthContextProvider from '../context/AuthContext';
import { toast } from 'react-toastify';

export function useReserve() {
    const [reserves, setReserves] = useState([])

    const getReserves = useCallback(async (id, date) => {
        let rtrn = []
        await ReserveService.getReserves(id, date)
            .then(({ data }) => {
                setReserves(data);
                rtrn = data
            })
        return rtrn
    }, [setReserves]);

    const getReservesByField = useCallback(async (id, date) => {
        let rtrn = []
        await ReserveService.getReservesByField(id, date)
            .then(({ data }) => {
                setReserves(data);
                rtrn = data
            })
        return rtrn
    }, [setReserves]);

    const createReserve = useCallback(async (data) => {
        await ReserveService.createReserve(data)
            .then(({ data }) => {
                toast.success('Reserve added successfully at ' + new Date(data.date_ini).toUTCString())
            }).catch((err) => {
                toast.error(err.response.data[0])
            })
    }, [])

    const getReservesByUser = useCallback(async (data) => {
        await ReserveService.getReservesByUser(data)
            .then(({ data }) => {
                setReserves(data)
            }).catch((err) => {
                toast.error(err.response.data)
            })
    }, [])

    const updateReserve = useCallback(async (reserve) => {
        console.log(reserve)
        await ReserveService.updateReserve(reserve)
            .then(({ data }) => {
                console.log(data)
                toast.success("Successfully updated id: "+ reserve.id)
            }).catch((err) => {
                console.log(err.response.data)
            })
    }, [])



    return { getReservesByField, reserves, setReserves, createReserve, getReservesByUser, getReserves, updateReserve }
}