import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const me = async () => {
        try {
            const { data } = await api.get("/api/auth/me");
            setUser({ email: data.email });
        } catch {
            setUser(null);
        } finally {
            setAuthLoading(false);
        }
    };

    useEffect(() => {
        me();
    }, []);

    const login = async (email, password) => {
        await api.post("/api/auth/login", { email, password });
        await me();
    };

    const register = async (email, password) => {
        await api.post("/api/auth/register", { email, password });
        await me();
    };

    const logout = async () => {
        await api.get("/api/auth/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, authLoading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
