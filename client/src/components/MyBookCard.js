import { useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';
import './../styles.css';

export default function MyBookCard({ mb }) {
    const { updateStatus, updateRating } = useContext(BooksContext);
    const b = mb.bookId;

    return (
        <div className="my-book-card">
            <img src={b.coverImage} alt={b.title} />
            <div className="my-book-details">
                <h4>{b.title}</h4>
                <p>{b.author}</p>
                <div className="book-controls">
                    <label>
                        Status:
                        <select value={mb.status} onChange={e => updateStatus(b._id, e.target.value)}>
                            <option>Want to Read</option>
                            <option>Currently Reading</option>
                            <option>Read</option>
                        </select>
                    </label>
                </div>
                <div className="book-controls" style={{ marginTop: '12px' }}>
                    <label>
                        Rating:
                        <select value={mb.rating || ''} onChange={e => updateRating(b._id, Number(e.target.value))}>
                            <option value="">—</option>
                            {[1, 2, 3, 4, 5].map(n => (
                                <option key={n} value={n}>{n}★</option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
        </div>

    );
}
