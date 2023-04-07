import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {

  const {currentUser, logout} = useContext(AuthContext);

  return(
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/posts">
            <img src={Logo} alt="Logo"/>
          </Link>
        </div>        
        <div className="links">
          <Link className="link" to="/">
            <h6><b>HOME</b></h6>
          </Link>
          <Link className="link" to="/posts?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/posts?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/posts?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/posts?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/posts?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? 
            (<span onClick={logout}>Logout</span>) : 
            (<Link className="link" to="/login">Login</Link>)
          }
          <span className="write">
          <Link className="link" to="/write">Write</Link>
          </span>          
        </div>
      </div>
    </div>
  )    
}


export default Navbar;