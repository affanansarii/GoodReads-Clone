import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const { login } = useAuth();
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            await login(email, password);
            nav("/");
        } catch (e) {
            setErr(e?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="container py-4" style={{ maxWidth: 480 }}>
            <h3 className="mb-3">Login</h3>
            {err && <div className="alert alert-danger">{err}</div>}
            <form onSubmit={handleSubmit} className="card p-3">
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-primary">Login</button>
                <p className="mt-3 small">
                    No account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}
