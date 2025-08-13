import RatingStars from "./RatingStars";
import { useBooks } from "../contexts/BooksContext";

const statuses = ["Want to Read", "Currently Reading", "Read"];

export default function MyBookCard({ item }) {
    const { updateStatus, updateRating } = useBooks();
    const { book, status, rating } = item;

    const handleStatus = async (e) => {
        await updateStatus(book._id, e.target.value);
    };
    const handleRating = async (val) => {
        await updateRating(book._id, val);
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
                <p className="text-muted">{book.author}</p>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={handleStatus}
                    >
                        {statuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-auto">
                    <label className="form-label">Rating</label>
                    <RatingStars value={rating || 0} onChange={handleRating} />
                </div>
            </div>
        </div>
    );
}
