import React from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/button" 
import { Fade } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import './NavBar.css'
const NavBar = () => {
    const [navbar, setNavbar] = useState(false);
    const changeBackground = () =>{
        if(window.scrollY >= 35){
            setNavbar(true);
        }
        else{
            setNavbar(false);
        }
    }
    window.addEventListener("scroll" , changeBackground)

    return(
        <div style={{paddingLeft:"100px", paddingRight:"100px"}} className = { navbar ? "navbar active" : "navbar" }>
            <div>
                 <Link to="/"><img src="logo.png" alt="logo" border="0"/></Link>
            </div>

            <div className="links-box">
                <ul>
                <li>Our Story</li>
                <li>Membership</li>
                <li>Write</li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar ;

