import { useBooks } from "../contexts/BooksContext";
import BookCard from "../components/BookCard";

export default function Home() {
    const { books, loadingBooks } = useBooks();

    if (loadingBooks)
        return (
            <div className="container py-4">
                <p>Loading books...</p>
            </div>
        );

    return (
        <div className="container py-4">
            <div className="row g-3">
                {books.map((b) => (
                    <div
                        key={b._id}
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                    >
                        <BookCard book={b} />
                    </div>
                ))}
            </div>
        </div>
    );
}
