import { useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';
import BookCard from '../components/BookCard';
import '../styles.css';

export default function Home() {
    const { books } = useContext(BooksContext);

    return (
        <div className="home-grid">
            {books.length === 0 ? (
                <p className="home-loading">Loading books...</p>
            ) : (
                books.map(b => <BookCard key={b._id} book={b} />)
            )}
        </div>
    );
}
