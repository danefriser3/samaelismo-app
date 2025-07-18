import { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../data/queries';
import { secureStorage, isTokenValid } from '../utils/secureStorage';


interface User {
    email: string;
    username?: string;
    role: string;
    token: string;
    // Password rimossa per sicurezza - mai salvare password nel client!
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
        // Recupera i dati utente e token dal storage sicuro
        const userData = secureStorage.getUserData();
        const token = secureStorage.getToken();
        
        if (userData && token && isTokenValid(token)) {
            setUser({ ...userData, token });
        } else {
            // Se token non valido, pulisci tutto
            secureStorage.clearAll();
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
                    username: result.username,
                    email: result.email,
                    role: result.role,
                    token: result.token
                };
                
                setUser(loggedUser);
                
                // Salva separatamente token e dati utente
                secureStorage.setToken(result.token);
                secureStorage.setUserData({
                    username: result.username,
                    email: result.email,
                    role: result.role
                });
                
                return true;
            }

            return false;
        } catch (err: any) {
            console.error('Errore login:', err);
            // Gestione migliorata degli errori
            if (err.networkError) {
                console.error('Errore di rete durante il login');
            } else if (err.graphQLErrors?.length > 0) {
                console.error('Errore GraphQL:', err.graphQLErrors[0].message);
            }
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
        } catch (err: any) {
            console.error('Errore registrazione:', err);
            // Gestione migliorata degli errori
            if (err.networkError) {
                console.error('Errore di rete durante la registrazione');
            } else if (err.graphQLErrors?.length > 0) {
                console.error('Errore GraphQL:', err.graphQLErrors[0].message);
            }
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        secureStorage.clearAll();
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
