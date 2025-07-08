import { useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';
import { AuthContext } from '../contexts/AuthContext';
import MyBookCard from '../components/MyBookCard';
import { Navigate } from 'react-router-dom';
import '../styles.css';

export default function MyBooks() {
    const { user } = useContext(AuthContext);
    const { myBooks } = useContext(BooksContext);

    if (!user) return <Navigate to="/auth" />;

    return (
        <div className="my-books-container">
            {myBooks.length === 0 ? (
                <p className="my-books-empty">No books in your list yet.</p>
            ) : (
                myBooks.map(mb => <MyBookCard key={mb.bookId._id} mb={mb} />)
            )}
        </div>
    );
}
