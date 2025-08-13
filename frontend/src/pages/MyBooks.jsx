import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useBooks } from "../contexts/BooksContext";
import MyBookCard from "../components/MyBookCard";

export default function MyBooks() {
    const { user, authLoading } = useAuth();
    const { myBooks, loadingMyBooks } = useBooks();

    if (authLoading)
        return (
            <div className="container py-4">
                <p>Checking auth...</p>
            </div>
        );
    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="container py-4">
            <h3 className="mb-3">My Books</h3>
            {loadingMyBooks ? (
                <p>Loading your books...</p>
            ) : (
                <div className="row g-3">
                    {myBooks.length === 0 && (
                        <p>You haven’t added any books yet.</p>
                    )}
                    {myBooks.map((item) => (
                        <div
                            key={item._id}
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                        >
                            <MyBookCard item={item} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
