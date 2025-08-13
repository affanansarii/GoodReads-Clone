import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const { register } = useAuth();
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            await register(email, password);
            nav("/");
        } catch (e) {
            setErr(e?.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container py-4" style={{ maxWidth: 480 }}>
            <h3 className="mb-3">Register</h3>
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
                <button className="btn btn-primary">Create Account</button>
                <p className="mt-3 small">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
