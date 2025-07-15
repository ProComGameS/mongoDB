import {useState} from 'react'
import api from '../api/api';
import axios from "axios";

export function useAuth() {
    const [user, setUser] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post('/login', { email, password });
            setUser(res.data.user.email);
            setError(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.error || 'Помилка входу';
                setError(msg);
            } else {
                setError('Невідома помилка');
            }
        }
    };

    const register = async (email: string, password: string) => {
        try {
            await api.post('/register', { email, password });
            setError(null);
            await login(email, password);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message || 'Помилка реєстрації';
                setError(msg);
            } else {
                setError('Невідома помилка');
            }
        }
    };

    const logout = async () => {
        await api.post('/logout');
        setUser(null);
    };

    return { user, error, login, logout, register };
}
