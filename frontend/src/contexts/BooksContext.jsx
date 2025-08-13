import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const BooksContext = createContext(null);
export const useBooks = () => useContext(BooksContext);

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true);

    const [myBooks, setMyBooks] = useState([]);
    const [loadingMyBooks, setLoadingMyBooks] = useState(false);

    const { user } = useAuth();

    const fetchBooks = async () => {
        setLoadingBooks(true);
        try {
            const { data } = await api.get("/api/books");
            setBooks(data);
        } finally {
            setLoadingBooks(false);
        }
    };

    const fetchMyBooks = async () => {
        if (!user) {
            setMyBooks([]);
            return;
        }
        setLoadingMyBooks(true);
        try {
            const { data } = await api.get("/api/mybooks");
            setMyBooks(data);
        } finally {
            setLoadingMyBooks(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);
    useEffect(() => {
        fetchMyBooks();
    }, [user]);

    const addToMyBooks = async (bookId) => {
        await api.post(`/api/mybooks/${bookId}`);
        await fetchMyBooks();
    };

    const updateStatus = async (bookId, status) => {
        await api.patch(`/api/mybooks/${bookId}/status`, { status });
        await fetchMyBooks();
    };

    const updateRating = async (bookId, rating) => {
        await api.patch(`/api/mybooks/${bookId}/rating`, { rating });
        await fetchMyBooks();
    };

    return (
        <BooksContext.Provider
            value={{
                books,
                loadingBooks,
                myBooks,
                loadingMyBooks,
                addToMyBooks,
                updateStatus,
                updateRating,
                fetchMyBooks,
            }}
        >
            {children}
        </BooksContext.Provider>
    );
}
