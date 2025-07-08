import { useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';
import { AuthContext } from '../contexts/AuthContext';
import './../styles.css';

export default function BookCard({ book }) {
    const { addMyBook, myBooks } = useContext(BooksContext);
    const { user } = useContext(AuthContext);

    const added = myBooks.some(m => m.bookId._id === book._id);

    const handleClick = () => {
        if (!user) return alert('Please log in first');
        if (!added) addMyBook(book._id);
    };

    return (
        <div className="book-card">
            <img src={book.coverImage} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <button onClick={handleClick} disabled={added}>
                {added ? 'Added' : 'Want to Read'}
            </button>
        </div>

    );
}
