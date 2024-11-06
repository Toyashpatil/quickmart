import React,{useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const Success = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const trancid = queryParams.get('trancid');
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.setItem('trancid',trancid);
        navigate('/')
    
      return () => {
        second
      }
    }, [])
    
    return (
        <div>Success</div>
    )
}

export default Success