// Gestione sicura dei token di autenticazione

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const secureStorage = {
    // Salva il token in sessionStorage invece di localStorage per maggiore sicurezza
    setToken: (token: string) => {
        try {
            sessionStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            console.error('Errore nel salvare il token:', error);
        }
    },

    getToken: (): string | null => {
        try {
            return sessionStorage.getItem(TOKEN_KEY);
        } catch (error) {
            console.error('Errore nel recuperare il token:', error);
            return null;
        }
    },

    removeToken: () => {
        try {
            sessionStorage.removeItem(TOKEN_KEY);
        } catch (error) {
            console.error('Errore nel rimuovere il token:', error);
        }
    },

    // Salva dati utente senza password
    setUserData: (user: { email: string; username?: string; role: string }) => {
        try {
            sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Errore nel salvare i dati utente:', error);
        }
    },

    getUserData: () => {
        try {
            const userData = sessionStorage.getItem(USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Errore nel recuperare i dati utente:', error);
            return null;
        }
    },

    removeUserData: () => {
        try {
            sessionStorage.removeItem(USER_KEY);
        } catch (error) {
            console.error('Errore nel rimuovere i dati utente:', error);
        }
    },

    // Clear completo di tutti i dati
    clearAll: () => {
        secureStorage.removeToken();
        secureStorage.removeUserData();
    }
};

// Verifica se il token è scaduto (basic check)
export const isTokenValid = (token: string): boolean => {
    if (!token) return false;
    
    try {
        // Basic check del formato JWT
        const parts = token.split('.');
        if (parts.length !== 3) return false;
        
        // Decode payload per controllare scadenza
        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);
        
        return payload.exp ? payload.exp > now : true;
    } catch (error) {
        console.error('Errore nella validazione del token:', error);
        return false;
    }
};
