import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Write.css"; 
import WriteContent from "./WriteContent";

const Write = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && token === "undefined") {
            navigate('/LoginForm');
        }
    }, [navigate]);

    return (
        <WriteContent/>
    );
}

export default Write;