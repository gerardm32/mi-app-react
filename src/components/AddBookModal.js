import React, { useState, useContext } from 'react';
import axios from '../axios';
import AuthContext from '../context/AuthContext';
import './AddBookModal.css';

const AddBookModal = ({ onClose, onBookAdded }) => {
    const { authState } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleAddBook = async () => {
        try {
            const response = await axios.post('/books/', { 
                name, 
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${authState.token}`,
                },
            });

            onBookAdded(response.data);
            setName('');
            setDescription('');
            onClose();
        } catch (error) {
            console.error('Error añadiendo un libro:', error);
            setError('No se pudo añadir el libro. Intenta de nuevo.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Agregar Libro</h2>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button onClick={handleAddBook}>Agregar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default AddBookModal;
