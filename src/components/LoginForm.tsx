import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, OutlinedInput, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Login, Logout } from '@mui/icons-material';

export default function LoginForm() {
    const { login, user, logout, register } = useAuth();
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
            {user ? <>
                <Button variant="contained" color="inherit" sx={{ borderRadius: ".5em", color: "dimgray", display: "flex", gap: "8px" }}><img style={{ height: "30px", width: "30px", borderRadius: "50%" }} src="oaa_logo.jpg" alt="Farmacon Icon" /><p>Welcome, {user?.email.split("@")[0]}</p></Button>
                <IconButton sx={{ backgroundColor: "lightgrey" }} onClick={() => {
                    logout();
                }} >
                    <Logout />
                </IconButton>
            </>
                : <IconButton sx={{ backgroundColor: "lightgrey" }} onClick={handleClickOpen} >
                    <Login />
                </IconButton>}
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
