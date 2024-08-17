import React, { useState } from 'react';
import LoginForm from './components/LoginForm'; 
import RegisterForm from './components/RegisterForm'; 
import './NavBar.css';

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login'); 

  const handleLoginClick = () => {
    setModalType('login');
    setShowModal(true);
  };

  const handleRegisterClick = () => {
    setModalType('register');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="navbar-logo">Mi Aplicación</h1>
        <div className="navbar-buttons">
          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
          <button className="register-button" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </nav>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{modalType === 'login' ? 'Login' : 'Register'}</h2>
            {modalType === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;