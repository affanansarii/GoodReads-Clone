import { useAuth } from "../contexts/AuthContext";
import { useBooks } from "../contexts/BooksContext";

export default function BookCard({ book }) {
    const { user } = useAuth();
    const { addToMyBooks } = useBooks();

    const onWantToRead = async () => {
        if (!user) return alert("Please login to add books");
        await addToMyBooks(book._id);
        alert("Added to My Books");
    };

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={book.coverImage}
                className="card-img-top"
                alt={book.title}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text text-muted mb-2">{book.author}</p>
                <span
                    className={`badge ${
                        book.availability ? "bg-success" : "bg-secondary"
                    } mb-3`}
                >
                    {book.availability ? "Available" : "Unavailable"}
                </span>
                <button
                    className="btn btn-primary mt-auto"
                    onClick={onWantToRead}
                >
                    Want to Read
                </button>
            </div>
        </div>
    );
}
