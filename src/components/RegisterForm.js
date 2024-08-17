import React, { useState } from 'react';
import axios from '../axios'; // Asegúrate de que la configuración de Axios esté correcta

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register/', {
        email,
        username,  
        password   
      });
      setMessage(`User registered with ID: ${response.data.id}`);
      setError(null);
    } catch (err) {
      let errorMessage = 'An unknown error occurred';
      if (err.response) {
        errorMessage = err.response.data.detail || 'An error occurred';
      } else if (err.request) {
        errorMessage = 'No response received from server.';
      } else {
        errorMessage = 'Error configuring the request.';
      }
      setError(errorMessage);
      setMessage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </form>
  );
};

export default RegisterForm;
