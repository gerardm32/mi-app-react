import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { setAuthState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // validar el email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      // enviar la solicitud de inicio de sesion
      const response = await axios.post('http://127.0.0.1:8000/login/', { email, username, password });
      
      console.log('Login Response:', response.data); // verifica la respuesta del backend

      // guarda el token y la informacion del usuario en el contexto
      setAuthState({
        isAuthenticated: true,
        user: response.data.user, 
        token: response.data.token 
      });

      // redirigir a la pagina de bienvenida
      navigate('/welcome');
    } catch (error) {
      console.error('Login Error:', error); // verifica el error
      setError('Credenciales incorrectas.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
