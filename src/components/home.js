import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

export default function Home() {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }

    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            Home Page

            <div>
                <Button variant="outlined" color="error" onClick={handleLogout}>Log out</Button>
            </div>
        </div>
    )
}
