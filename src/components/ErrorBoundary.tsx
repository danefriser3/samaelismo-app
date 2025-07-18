import { Component, ErrorInfo, ReactNode } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Aggiorna lo state per mostrare l'UI di fallback
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log dell'errore per debugging
        console.error('ErrorBoundary ha catturato un errore:', error);
        console.error('Dettagli errore:', errorInfo);
        
        this.setState({
            error,
            errorInfo
        });
        
        // Qui potresti inviare l'errore a un servizio di monitoraggio
        // come Sentry, LogRocket, etc.
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    render() {
        if (this.state.hasError) {
            // Usa il fallback personalizzato se fornito
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // UI di errore di default
            return (
                <Container maxWidth="sm" sx={{ mt: 4 }}>
                    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h5" color="error" gutterBottom>
                            Oops! Qualcosa è andato storto
                        </Typography>
                        
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Si è verificato un errore inaspettato. Prova a ricaricare la pagina.
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button 
                                variant="contained" 
                                onClick={this.handleRetry}
                                color="primary"
                            >
                                Riprova
                            </Button>
                            
                            <Button 
                                variant="outlined" 
                                onClick={() => window.location.reload()}
                                color="secondary"
                            >
                                Ricarica Pagina
                            </Button>
                        </Box>
                        
                        {import.meta.env.DEV && this.state.error && (
                            <Box sx={{ mt: 3, textAlign: 'left' }}>
                                <Typography variant="h6" color="error">
                                    Dettagli errore (solo in sviluppo):
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    component="pre" 
                                    sx={{ 
                                        backgroundColor: '#f5f5f5', 
                                        p: 2, 
                                        mt: 1, 
                                        overflow: 'auto',
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
