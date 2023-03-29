import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import SportsService from "../services/SportsService";
import AuthContextProvider from '../context/AuthContext';
import SportsContext from '../context/SportsContext';
import { toast } from 'react-toastify';

export function useSports() {
    const [loading, setLoading] = useState(false);
    // const [sports, setSports] = useState([])
    const { sports, setSports } = useContext(SportsContext)
    const { rftoken } = useContext(AuthContextProvider)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        SportsService.getSports()
            .then(({ data }) => {
                setSports(data)
                setLoading(false)
            })

    }, [])
    return { sports }
}