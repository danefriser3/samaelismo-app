import { useState, useCallback } from 'react';

// Hook personalizzato per gestire stati di loading
export const useLoadingState = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const withLoading = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await asyncFn();
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto';
            setError(errorMessage);
            console.error('Errore durante operazione asincrona:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const resetError = useCallback(() => {
        setError(null);
    }, []);

    return {
        loading,
        error,
        withLoading,
        resetError
    };
};
