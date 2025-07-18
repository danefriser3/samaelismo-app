import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useErrorHandler } from '../hooks/useErrorHandler';

interface ErrorDisplayProps {
    anchorOrigin?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
}

export const ErrorDisplay = ({ 
    anchorOrigin = { vertical: 'top', horizontal: 'center' } 
}: ErrorDisplayProps) => {
    const { error, clearError } = useErrorHandler();

    const getSeverity = (type: string) => {
        switch (type) {
            case 'error': return 'error';
            case 'warning': return 'warning';
            case 'info': return 'info';
            case 'success': return 'success';
            default: return 'info';
        }
    };

    return (
        <Snackbar
            open={!!error}
            autoHideDuration={error?.duration || 5000}
            onClose={clearError}
            anchorOrigin={anchorOrigin}
        >
            <Alert 
                onClose={clearError} 
                severity={getSeverity(error?.type || 'info')}
                variant="filled"
            >
                {error?.message}
            </Alert>
        </Snackbar>
    );
};

export default ErrorDisplay;
