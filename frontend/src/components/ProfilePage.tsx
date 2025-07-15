
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Profile: React.FC = () => {
    const { user, error, login, logout, register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div style={{ padding: "10vh" }}>
            <h1>Профіль користувача</h1>
            <p>Вітаю {user}</p>

            {user ? (
                <>
                    <p>Вітаю, {user}!</p>
                    <button onClick={logout}>Вийти</button>
                </>
            ) : (
                <>
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Пароль"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={() => login(email, password)}>Увійти</button>
                    <button onClick={() => register(email, password)}>Зареєструватися</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            )}
        </div>
    );
};

export default Profile;
