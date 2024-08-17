// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BooksList from './components/BooksList';
import AddBookModal from './components/AddBookModal';
import WelcomePage from './components/WelcomePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BooksList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <ProtectedRoute>
                <AddBookModal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;