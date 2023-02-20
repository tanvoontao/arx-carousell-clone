'use client'

import { hideAlert } from "@/redux/alert/action";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import {
    Alert,
    AlertTitle
} from '@mui/material';

// type can be: error | warning | info | success
const Alertt = ({ severity, style = {}, className = "", children }) => {
    const state = useSelector(state => state.alert);
    const [isVisible, setIsVisible] = useState(false);

    const borderColor = {
        error: 'red',
        warning: 'orange',
        info: 'blue',
        success: 'green',
        default: 'black',
    };

    useEffect(() => {
        setIsVisible(state.show);
    }, [state.show]);

    return (

        <Alert
            severity={severity}
            style={{
                transition: "transform 0.5s ease-in-out",
                transform: isVisible ? "translateX(0)" : "translateX(100%)",
                border: `1px solid ${borderColor[severity] || borderColor['default']}`,
                zIndex: 99999999999999,
                ...style
            }}
            className={className} onClose={() => {
                setIsVisible(false);
                setTimeout(() => {
                    hideAlert();
                }, 500);
            }}>
            <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
            {children}
        </Alert>
    )
}


export default Alertt