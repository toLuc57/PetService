import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo-animal.png";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext);

  return(
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={Logo} alt="Logo"/>
          </Link>
        </div>        
        <div className="links">
          <Link className="link" to="/service">
            <h6>SERVICE</h6>
          </Link>
          <Link className="link" to="/shop">
            <h6>SHOP</h6>
          </Link>          
          <Link className="link" to="/posts">
            <h6>BLOG</h6>
          </Link>
          |
          <span>{currentUser?.username}</span>
          {currentUser ? 
            (<span onClick={logout}>Logout</span>) : 
            (<Link className="link" to="/login">Login</Link>)
          }
        </div>
      </div>
    </div>
  )    
}


export default Navbar;