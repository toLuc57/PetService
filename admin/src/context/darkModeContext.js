import { createContext, useEffect, useReducer, useState } from "react";
import DarkModeReducer from "./darkModeReducer";
import axios from "axios";

const INITIAL_STATE = {
  darkMode: false,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  const [currentAdmin, setCurrentAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
    );

  const login = async(inputs)=>{
      const res = await axios.post("admin/login", inputs);
      setCurrentAdmin(res.data);
  };

  const logout = async()=>{
      await axios.post("admin/logout");
      setCurrentAdmin(null);
  };

  useEffect(()=>{
      localStorage.setItem("admin", JSON.stringify(currentAdmin));
  }, [currentAdmin]);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch, currentAdmin, login, logout }}>
      {children}
    </DarkModeContext.Provider>
  );
};
