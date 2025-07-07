import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Divider, ListItem, ListItemButton, ListItemText, OutlinedInput, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

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
        const ok = await login(email, password);
        if (!ok) setError('Not working, try again');
        handleClose();
    };
    const handleRegister = async () => {
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }
        const ok = await register(email, password);
        if (!ok) setError('Not working, try again');
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
