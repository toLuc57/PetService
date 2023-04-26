import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo-admin.png";
import { useContext } from "react";
import { AdminContext } from "../context/adminContext";

const Navbar = () => {

  const {currentAdmin, logout} = useContext(AdminContext);

  return(
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/admin">
            <img src={Logo} alt="Logo"/>
          </Link>
        </div>
        <div className="links">
          |
          <span><b>{currentAdmin?.username}</b></span>
          {currentAdmin ? 
            (<span onClick={logout}>Logout</span>) : 
            (<Link className="link" to="/admin/login">Login</Link>)
          }
          <span className="write">
          <Link className="link" to="/admin/services?cat=add">Write</Link>
          </span> 
        </div>
      </div>
    </div>
  )    
}


export default Navbar;