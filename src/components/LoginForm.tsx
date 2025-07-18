import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword, sanitizeInput } from '../utils/validation';

export default function LoginForm({ isMobile, setMobileOpen }: { isMobile: boolean, setMobileOpen: (open: boolean) => void }) {
    const { login, register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setEmail('');
        setPassword('');
        setOpen(false);
    };

    const handleLogin = async () => {
        // Validazione input
        if (!validateEmail(email)) {
            setError('Inserisci un indirizzo email valido');
            return;
        }
        
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            setError(passwordValidation.message || 'Password non valida');
            return;
        }
        
        // Sanitizza input prima dell'invio
        const cleanEmail = sanitizeInput(email);
        const cleanPassword = sanitizeInput(password);
        
        const ok = await login(cleanEmail, cleanPassword);
        if (!ok) {
            setError('Credenziali non valide. Riprova.');
            return;
        }
        handleClose();
    };
    const handleRegister = async () => {
        // Validazione completa per registrazione
        if (!validateEmail(email)) {
            setError('Inserisci un indirizzo email valido');
            return;
        }
        
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            setError(passwordValidation.message || 'Password non valida');
            return;
        }
        
        // Sanitizza input prima dell'invio
        const cleanEmail = sanitizeInput(email);
        const cleanPassword = sanitizeInput(password);
        
        const ok = await register(cleanEmail, cleanPassword);
        if (!ok) {
            setError('Registrazione fallita. Email già esistente o errore del server.');
            return;
        }
        handleClose();
    };

    const guestLogin = async () => {
        await login("guest", "guest");
        handleClose();
    }

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={() => {
                        handleClickOpen();
                        if (isMobile) setMobileOpen(false);
                    }}
                >
                    <ListItemText primary="Login" />
                </ListItemButton>
            </ListItem>
            <Dialog
                open={open}
                fullWidth
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: { alignSelf: 'flex-start', mt: 6, backgroundColor: "lightgray" } // mt: 6 sposta la dialog più in alto
                    }
                }}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <OutlinedInput
                        fullWidth
                        size="small"
                        placeholder="Email"
                        sx={{ backgroundColor: "white", borderRadius: ".75em" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <OutlinedInput
                        fullWidth
                        size="small"
                        placeholder="Password"
                        sx={{ backgroundColor: "white", borderRadius: ".75em" }}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Button size='small' fullWidth variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>
                            Login
                        </Button>
                        <Button size='small' fullWidth variant="contained" onClick={guestLogin} sx={{ mt: 2 }}>
                            Login as guest
                        </Button>
                        <Divider sx={{ mt: 2}} />
                        <Button size='small' fullWidth variant="contained" onClick={handleRegister} sx={{ mt: 2 }}>
                            Register
                        </Button>
                    </div>
                </ DialogContent>
            </Dialog></>
    );
}
