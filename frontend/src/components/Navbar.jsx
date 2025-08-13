import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    My Library
                </Link>
                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#nav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="nav" className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/my-books">
                                    My Books
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            <>
                                <li className="nav-item text-white me-3 small">
                                    Signed in:{" "}
                                    <span className="fw-semibold">
                                        {user.email}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light btn-sm"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/register"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
