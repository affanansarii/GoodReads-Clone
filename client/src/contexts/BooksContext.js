import { createContext, useState, useContext, useEffect } from 'react';
import api from '../axios';
import { AuthContext } from './AuthContext';

export const BooksContext = createContext();

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [myBooks, setMyBooks] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchBooks = async () => {
        const res = await api.get('/books');
        setBooks(res.data);
    };

    const fetchMyBooks = async () => {
        if (!user) return setMyBooks([]);
        const res = await api.get('/mybooks');
        setMyBooks(res.data);
    };

    const addMyBook = async (bookId) => {
        const res = await api.post(`/mybooks/${bookId}`);
        setMyBooks(prev => [...prev, res.data]);
    };

    const updateStatus = async (bookId, status) => {
        const res = await api.patch(`/mybooks/${bookId}/status`, { status });
        setMyBooks(prev => prev.map(b => b.bookId._id === bookId ? res.data : b));
    };

    const updateRating = async (bookId, rating) => {
        const res = await api.patch(`/mybooks/${bookId}/rating`, { rating });
        setMyBooks(prev => prev.map(b => b.bookId._id === bookId ? res.data : b));
    };

    useEffect(() => {
        fetchBooks();
        fetchMyBooks();
    }, [user]);

    return (
        <BooksContext.Provider value={{ books, myBooks, addMyBook, updateStatus, updateRating }}>
            {children}
        </BooksContext.Provider>
    );
}
