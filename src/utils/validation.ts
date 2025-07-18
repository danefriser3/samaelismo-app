// Utility per validazione input sicura

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
    if (!password || password.length < 6) {
        return {
            isValid: false,
            message: 'La password deve essere lunga almeno 6 caratteri'
        };
    }
    
    if (password.length > 128) {
        return {
            isValid: false,
            message: 'La password non può superare i 128 caratteri'
        };
    }
    
    return { isValid: true };
};

export const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
};

export const validateUsername = (username: string): { isValid: boolean; message?: string } => {
    if (!username || username.length < 2) {
        return {
            isValid: false,
            message: 'Il nome utente deve essere lungo almeno 2 caratteri'
        };
    }
    
    if (username.length > 50) {
        return {
            isValid: false,
            message: 'Il nome utente non può superare i 50 caratteri'
        };
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        return {
            isValid: false,
            message: 'Il nome utente può contenere solo lettere, numeri, _ e -'
        };
    }
    
    return { isValid: true };
};
