import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles.css';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="brand">My Library</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                {user && <Link to="/mybooks">My Books</Link>}
                {user ? (
                    <>
                        <span>{user.email}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/auth">Login/Register</Link>
                )}
            </div>
        </nav>

    );
}
