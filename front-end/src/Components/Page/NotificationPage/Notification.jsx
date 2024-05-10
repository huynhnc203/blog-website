import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../LoginForm/CheckLogin";
import NotificationCenter from "./NotificationCenter";
import "./Notification.css";
import Right from "./Right";

const Notification = () => {
    const {isLoggedIn, setIsLoggedIn} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn === false){
            navigate('/LoginForm');
        }
    }, [navigate, isLoggedIn]);
    return(
        <>
            <Right/>
            <div className="notification-center">   
                <NotificationCenter/>
            </div>
    
        </>
    )   
}

export default Notification;