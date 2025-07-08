import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import '../styles.css';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) await login({ email, password });
            else await register({ email, password });
        } catch (err) { alert(err.response?.data?.msg || err.message); }
    };

    if (user) return <Navigate to="/" />;
    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <p className="auth-toggle">
                {isLogin ? "Need an account?" : "Have one?"}
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </div>

    );
}
