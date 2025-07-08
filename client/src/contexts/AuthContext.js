import { createContext, useState, useEffect } from 'react';
import api from '../axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (data) => {
        const res = await api.post('/auth/login', data);
        setUser(res.data);
    };

    const register = async (data) => {
        const res = await api.post('/auth/register', data);
        setUser(res.data);
    };

    const logout = async () => {
        await api.get('/auth/logout');
        setUser(null);
    };

    const fetchMe = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data);
        } catch (err) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
