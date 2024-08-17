import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const WelcomePage = () => {
    const navigate = useNavigate();
    const { setAuthToken } = useAuth(); 

    const handleLogout = () => {
        console.log('Logging out'); 
        setAuthToken(null); 
        navigate('/login'); 
    };

    const handleViewBooks = () => {
        console.log('Navigating to books'); 
        navigate('/books'); 
    };

    return (
        <div>
            <h1>Bienvenido a la base de datos de FastAPI</h1>
            <button onClick={handleLogout}>Desconectar</button>
            <button onClick={handleViewBooks}>Mis Libros</button>
        </div>
    );
};

export default WelcomePage;