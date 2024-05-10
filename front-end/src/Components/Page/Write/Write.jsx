import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Write.css"; 
import {useAuth} from "../../LoginForm/CheckLogin";
import WriteContent from "./WriteContent";



const Write = () => {
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn === false){
            navigate('/LoginForm');
        }
    }, [navigate, isLoggedIn]);

    return (
        <WriteContent/>
    );
}

export default Write;