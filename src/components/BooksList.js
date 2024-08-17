import React, { useEffect, useState, useContext } from 'react';
import axios from '../axios';
import AuthContext from '../context/AuthContext';
import AddBookModal from './AddBookModal';
import DataTable from 'react-data-table-component';
import './BooksList.css';

const BooksList = () => {
    const { authTokens } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('api/books/', {
                    headers: {
                        Authorization: `Bearer ${authTokens?.accessToken}`,
                    },
                });
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [authTokens]);

    const handleAddBook = (newBook) => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
    };

    const handleEdit = (bookId) => {
        console.log(`Edit book with ID: ${bookId}`);
        
    };

    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${authTokens?.accessToken}`,
                },
            });
            setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <div>
                    <button onClick={() => handleEdit(row.id)}>Editar</button>
                    <button onClick={() => handleDelete(row.id)}>Eliminar</button>
                </div>
            ),
        },
    ];

    return (
        <div className="books-list">
            <h2>Mis Libros</h2>
            <button onClick={() => setShowAddModal(true)}>Agregar Libro</button>
            <DataTable
                columns={columns}
                data={books}
                pagination
                highlightOnHover
                responsive
            />
            {showAddModal && (
                <AddBookModal
                    onClose={() => setShowAddModal(false)}
                    onBookAdded={handleAddBook}
                />
            )}
        </div>
    );
};

export default BooksList;
