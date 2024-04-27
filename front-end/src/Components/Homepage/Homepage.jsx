import React from "react";
import './Homepage.css'
import LoginForm from "../LoginForm/LoginForm";
import { Button } from "react-bootstrap";

const Homepage = () => {
    return(
        <>
        <div>
        <div className="banner" style={{ backgroundImage: `url("baner2.png")` }}>   
                <div style={{paddingLeft: '120px'}}>
                    <h1>World of Technology</h1>
                    <p>Discover stories, thinking, and expertise from writers on any topic.</p>
                    <button type="button" class="btn btn-lg rounded-5 custom-button">Get started</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Homepage;
