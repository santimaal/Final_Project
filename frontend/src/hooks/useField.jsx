import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import FieldsService from "../services/FieldsService";
import AuthContextProvider from '../context/AuthContext';
import { toast } from 'react-toastify';

export function useFields() {
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState([])
    const { rftoken } = useContext(AuthContextProvider)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        FieldsService.getFields()
            .then(({ data }) => {
                console.log(data);
                setFields(data)
                setLoading(false)
            })

    }, [])
    return { fields }
}