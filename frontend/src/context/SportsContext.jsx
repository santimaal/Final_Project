import React, { useState, useEffect } from 'react'
import SportsService from '../services/SportsService'
// import RentContext from "../context/RentContext"

const Context = React.createContext([])

export function SportsContextProvider({ children }) {
    const [sports, setSports] = useState([])
    // const {rent} = useContext(RentContext)

    useEffect(function () {
        SportsService.getSports()
            .then(({ data }) => {
                setSports(data)
            })
    }, [setSports])

    return <Context.Provider value={{ sports, setSports }}>
        {children}
    </Context.Provider>
}

export default Context