import { useState, useCallback } from 'react';

interface ErrorInfo {
    message: string;
    type: 'error' | 'warning' | 'info' | 'success';
    duration?: number;
}

export const useErrorHandler = () => {
    const [error, setError] = useState<ErrorInfo | null>(null);

    const showError = useCallback((message: string, type: ErrorInfo['type'] = 'error', duration: number = 5000) => {
        setError({ message, type, duration });
        
        // Auto-clear dell'errore dopo la durata specificata
        if (duration > 0) {
            setTimeout(() => {
                setError(null);
            }, duration);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const handleGraphQLError = useCallback((error: any) => {
        console.error('GraphQL Error:', error);
        
        if (error.networkError) {
            showError('Errore di connessione. Controlla la tua connessione internet.', 'error');
        } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            const message = error.graphQLErrors[0].message || 'Errore del server';
            showError(message, 'error');
        } else {
            showError('Si è verificato un errore inaspettato', 'error');
        }
    }, [showError]);

    const handleAsyncOperation = useCallback(async <T>(
        operation: () => Promise<T>,
        options?: {
            successMessage?: string;
            errorMessage?: string;
            loadingMessage?: string;
        }
    ): Promise<T | null> => {
        try {
            if (options?.loadingMessage) {
                showError(options.loadingMessage, 'info', 0);
            }

            const result = await operation();
            
            if (options?.successMessage) {
                showError(options.successMessage, 'success', 3000);
            } else {
                clearError();
            }
            
            return result;
        } catch (error: any) {
            console.error('Async operation failed:', error);
            
            const message = options?.errorMessage || 
                           error.message || 
                           'Si è verificato un errore inaspettato';
            
            showError(message, 'error');
            return null;
        }
    }, [showError, clearError]);

    return {
        error,
        showError,
        clearError,
        handleGraphQLError,
        handleAsyncOperation
    };
};

export default useErrorHandler;
