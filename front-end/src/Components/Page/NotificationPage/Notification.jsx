import React from "react";
import { Grid, Box } from "@chakra-ui/react";
import NotificationCenter from "./NotificationCenter";
import "./Notification.css";
import Right from "./Right";

const Notification = () => {
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