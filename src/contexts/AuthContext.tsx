import { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../data/queries';


interface User {
    email: string;
    role: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => false,
    register: async () => false,
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loginMutation] = useMutation(LOGIN_MUTATION);
    const [registerMutation] = useMutation(REGISTER_MUTATION);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await loginMutation({
                variables: { email, password },
            });

            const result = res.data?.login;
            if (result?.token) {
                const loggedUser = {
                    email: result.email,
                    token: result.token,
                    role: result.role
                };
                setUser(loggedUser);
                localStorage.setItem('user', JSON.stringify(loggedUser));
                return true;
            }

            return false;
        } catch (err) {
            console.error('Errore login:', err);
            return false;
        }
    };
    const register = async (email: string, password: string) => {
        try {
            const res = await registerMutation({
                variables: { email, password },
            });

            const result = res.data?.register;
            if (result) {
                login(email, password)
                return true;
            }

            return false;
        } catch (err) {
            console.error('Errore signin:', err);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
