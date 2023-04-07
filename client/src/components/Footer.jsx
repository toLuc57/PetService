import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
    return(
        <footer>
            <img src={Logo} alt=""></img>
            <span>
                Made with ♥ and <b>React.js</b>.
            </span>
        </footer>
    )
}


export default Footer;