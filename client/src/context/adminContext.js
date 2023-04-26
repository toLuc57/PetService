import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({children}) => {
    const [currentAdmin, setCurrentAdmin] = useState(
        JSON.parse(localStorage.getItem("admin")) || null
        );

    const login = async(inputs)=>{
        const res = await axios.post("/admin/login", inputs);
        setCurrentAdmin(res.data);
    };

    const logout = async()=>{
        await axios.post("admin/logout");
        setCurrentAdmin(null);
    };

    useEffect(()=>{
        localStorage.setItem("admin", JSON.stringify(currentAdmin));
    }, [currentAdmin]);

    return(
        <AdminContext.Provider value={{currentAdmin, login, logout}}>
            {children}
        </AdminContext.Provider>
    )
}