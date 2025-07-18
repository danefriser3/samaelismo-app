export interface Verso {
    titolo: string;
    testo: string;
}

export interface VersiCommentati {
    id?: string;
    codice: string;
    commento: string;
    data: string;
    data_commento: string;
    user: string;
}

// Nuovi tipi per migliorare la type safety
export interface UserProfile {
    email: string;
    username?: string;
    role: 'admin' | 'user' | 'guest';
    token?: string;
}

export interface SafeUserData {
    email: string;
    username?: string;
    role: string;
    // Password NON inclusa per sicurezza
}

export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export interface ApiError {
    message: string;
    code?: string;
    details?: any;
}

// Tipi per i dati liturgici
export interface Festivita {
    data: number[];
    tipo: 'Festività maggiore' | 'Festività minore';
    color?: string;
    description?: string;
}

export interface Spira {
    titolo: string;
    descrizione: string;
    sezioni: SezioneSpira[];
}

export interface SezioneSpira {
    sezione: string;
    versi: Verso[];
}