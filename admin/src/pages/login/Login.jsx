import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import "./login.scss"

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
})

  const navigate = useNavigate();

  const {login} = useContext(DarkModeContext);

  const [err, setError] = useState(null);

  const handleChange = (e) => {
      setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
          await login(inputs);
          navigate("/");
      }catch(err){
          setError(err.response.data);
      }
  };

  return (
      <div className="auth">
      <h1>Login for Admin</h1>
      <form>
            <input type="text" placeholder="username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="password" name="password" onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
        </form>
      </div>
  )
};

export default Login;