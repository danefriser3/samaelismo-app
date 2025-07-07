import { useMutation, useQuery } from "@apollo/client";
import { Notifications, Send } from "@mui/icons-material";
import { IconButton, Dialog, DialogTitle, DialogContent, OutlinedInput, DialogActions } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ADD_COMUNICATO, GET_COMUNICATI } from "../data/queries";

interface Comunicazioni {
    testo: string;
    tipo: string;
    data: number;
}

export default function NoticeBoard() {

    const { user } = useAuth();

    const [open, setOpen] = useState(false);

    const [comunicato, setComunicato] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setComunicato('')
        setOpen(false);
    };


    const handleSendComunicato = async () => {
        if (!comunicato.trim()) return;

        await creaCounicato({
            variables: {
                testo: comunicato,
                data: new Date(),
                tipo: "STAMPA"
            },
        });

        setComunicato('');
        refetch();
    };


    const [creaCounicato] = useMutation(ADD_COMUNICATO);

    const { loading, error, data, refetch } = useQuery(GET_COMUNICATI, {
        variables: { tipo: "STAMPA" },
    });


    return (
        <>
            <IconButton color="inherit" onClick={handleClickOpen}>
                <Notifications fontSize="small" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: { alignSelf: 'flex-start', mt: 6, backgroundColor: "lightgray" } // mt: 6 sposta la dialog più in alto
                    }
                }}
            >
                <DialogTitle>
                    News from OAA
                </ DialogTitle>
                <DialogContent>
                    {(loading && <p>Loading...</p>) || (error && <p>Error: {error.message}</p>) || (
                        data?.comunicati.length ? <ul>
                            {data.comunicati.map((c: Comunicazioni, i: number) => (
                                <li key={i}>
                                    <strong>[{c.data}]</strong>
                                    <div>{c.testo}</div>
                                </li>
                            ))}
                        </ul> : <>No news for now</>
                    )}
                </DialogContent>
                {user?.role === 'admin' && <DialogActions>
                    <OutlinedInput
                        fullWidth
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: ".75em" }}
                        placeholder="Write a new notification..."
                        value={comunicato}
                        onChange={(e) => setComunicato(e.target.value)}
                        endAdornment={
                            <IconButton size="small" onClick={handleSendComunicato}>
                                <Send fontSize="small" />
                            </IconButton>
                        }
                    />
                </DialogActions>}
            </Dialog>
        </>
    );
}
