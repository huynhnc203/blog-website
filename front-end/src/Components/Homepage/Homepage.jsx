import React from "react";
import { Link } from "react-router-dom";
import './Homepage.css'
import FeaturePost from "./HomepageTwo/FeaturePost";
import Learmore from "./HomepageThree/Learnmore";
import DevelopmentTeam from "./HomepageFour/DevelopmentTeam";
import GridEvaluatePage from "./EvaluatePage/EvaluatePage";
import Footer from "./Footer/Footer";
import ScrollUpButton from "./ScrollUpButton";

const Homepage = () => {
    return (
        <>
            <div>
                <div className="banner" style={{ backgroundImage: `url("baner2.png")` }}>
                    <div style={{ paddingLeft: '120px' }}>
                        <h1>World of Technology</h1>
                        <p style={{ lineHeight: '1em' }}>Discover stories, thinking, and expertise from writers on any topic.</p>
                        <Link to = "/LoginForm" className="nav-link">
                        <button type="button" class="btn btn-lg rounded-5 custom-button">Get started</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="feature-post-container">
                <FeaturePost />
            </div>
            <div className="Learn">
                <Learmore />
            </div>
            <div>
                <DevelopmentTeam />
            </div>
            <div>
                <GridEvaluatePage />
            </div>
            <div>
                <Footer />
            </div>
            <ScrollUpButton />
        </>
    )
}

export default Homepage;
