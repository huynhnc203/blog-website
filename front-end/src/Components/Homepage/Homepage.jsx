import React from "react";
import './Homepage.css'
import NavBar from "./NavBar";

const Homepage = () => {
    return(
        <>
        <NavBar />
        <div>
            <div className="banner">
                <div style={{paddingLeft: '120px'}}>
                    <h1>World of Technology</h1>
                    <p>Discover stories, thinking, and expertise from writers on any topic.</p>
                </div>
                <div className="banner-img-box">
                    <img src = ""  id = "bannerImg"></img>
                </div>
            </div>
        </div>
        </>
    )
}

export default Homepage;