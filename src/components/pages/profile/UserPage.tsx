import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useAuth } from '../../../contexts/AuthContext';
import { EDIT_USER_MUTATION } from '../../../data/queries';
import { useMutation } from '@apollo/client';

const UserPage: React.FC = () => {
    const { user, login } = useAuth();
    
    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');

    const [editUser] = useMutation(EDIT_USER_MUTATION);
    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
            // Non impostiamo più la password dal context per sicurezza
            setPassword('');
        }
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setShowConfirm(false);
        editUser({
            variables: {
                "token": user?.token,
                "currentPassword": currentPassword,
                "newUsername": username,
                "newEmail": email,
                "newPassword": password
              },
        }).then(() => {
            login(
                email,
                currentPassword,
            );
        });
        // Qui puoi aggiungere la logica di salvataggio
        setCurrentPassword('');
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Paper elevation={3} sx={{ p: 4, minWidth: 320, textAlign: 'center' }}>
                <Avatar
                    alt={username}
                    sx={{ width: 80, height: 80, margin: '0 auto 16px auto' }}
                />
                <Typography variant="h5" gutterBottom>
                    Edit profile
                </Typography>
                <form onSubmit={handleSave}>
                    <TextField
                        size='small'
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                    />
                    <TextField
                        size='small'
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                    />
                    <TextField
                        size='small'
                        label="New Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Save change
                    </Button>
                </form>
            </Paper>

            {/* Dialog per confermare la password attuale */}
            <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
                <DialogTitle>Conferma Modifica</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        Inserisci la tua password attuale per confermare le modifiche.
                    </Typography>
                    <TextField
                        label="Password attuale"
                        type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        fullWidth
                        autoFocus
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowConfirm(false)}>Annulla</Button>
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        color="primary"
                        disabled={!currentPassword}
                    >
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserPage;