import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Callback = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Get the URL search params
        const urlParams = new URLSearchParams(window.location.search);

        // Extract authToken and googleToken from the URL
        const authToken = urlParams.get('authToken');
        const googleToken = urlParams.get('googleToken');

        // Do something with authToken and googleToken
        localStorage.setItem('auth-token', authToken);
        localStorage.setItem('google-token', googleToken);
        setTimeout(() => {
            navigate('/');
        }, 1000);

        console.log('authToken:', authToken);
        console.log('googleToken:', googleToken);
    }, []);
    return (
        <div>
        </div>
    )
}

export default Callback