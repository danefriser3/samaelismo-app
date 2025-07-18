import { useMutation, useQuery } from "@apollo/client";
import Notifications from "@mui/icons-material/Notifications";
import Send from "@mui/icons-material/Send";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import OutlinedInput from "@mui/material/OutlinedInput";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
    ADD_COMUNICATO,
    ComunicatoConStato,
    ComunicatiConStatoResponse,
    GET_COMUNICATI_CON_STATO,
    MARK_COMUNICATO_AS_READ,
} from "../data/queries";
import AIFestivitaAssistant from "./AIFestivitaAssistant";
import { sanitizeInput } from '../utils/validation';

export default function NoticeBoard() {
    const { user } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [comunicato, setComunicato] = useState("");

    const [creaComunicato] = useMutation(ADD_COMUNICATO);
    const [markAsRead] = useMutation(MARK_COMUNICATO_AS_READ);

    const { data: comunicatiConStato, refetch: refetchConStato, loading } = useQuery<ComunicatiConStatoResponse>(GET_COMUNICATI_CON_STATO, {
        variables: { user: user?.email || "", tipo: "STAMPA" },
    });

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setComunicato("");
        refetchConStato();
    };

    const handleSendComunicato = async () => {
        if (!comunicato.trim()) return;
        
        // Sanitizza il testo del comunicato
        const sanitizedText = sanitizeInput(comunicato);
        
        if (!sanitizedText.trim()) {
            console.warn('Testo comunicato non valido dopo sanitizzazione');
            return;
        }
        
        try {
            await creaComunicato({
                variables: {
                    testo: sanitizedText,
                    data: new Date(),
                    tipo: "STAMPA",
                },
            });
            setComunicato("");
            refetchConStato();
        } catch (error) {
            console.error('Errore durante l\'invio del comunicato:', error);
        }
    };

    const handleMarkAsRead = async (comunicato: ComunicatoConStato) => {
        try {
            const date = comunicato.data.split("/");
            if (date.length !== 3) {
                console.error('Formato data non valido:', comunicato.data);
                return;
            }
            
            await markAsRead({
                variables: {
                    data: date[2] + "-" + date[0] + "-" + date[1], // Convert to YYYY-MM-DD
                    testo: comunicato.testo,
                    user: user?.email || "",
                },
            });
            refetchConStato();
        } catch (error) {
            console.error('Errore durante marcatura come letto:', error);
        }
    };

    const open = Boolean(anchorEl);
    const unreadCount = comunicatiConStato?.comunicatiConStato.filter(c => !c.letto).length ?? 0;

    const format = (d: string) => {
        const dd = d.split("/");
        const day = parseInt(dd[1]) < 10 ? "0" + dd[1] : dd[1];
        const month = parseInt(dd[0]) < 10 ? "0" + dd[0] : dd[0];
        return day + "/" + month + "/" + dd[2]
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit" onClick={handleOpen}>
                    <Badge badgeContent={unreadCount} color="warning" max={99}>
                        <Notifications />
                    </Badge>
                </IconButton>
                <AIFestivitaAssistant />
            </Box>
            {<Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{ mt: 1 }}
            >
                <Card className="min-w-[300px] !bg-slate-200">
                    <CardHeader className="!py-3" title="News from OAA" />
                    <Divider />
                    <CardContent className="!p-0">
                        {loading && <Skeleton variant="rectangular" /> || comunicatiConStato?.comunicatiConStato?.length ? (
                            <List
                                dense
                                sx={{
                                    maxHeight: 400,
                                    overflowY: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {comunicatiConStato?.comunicatiConStato.map((c, i) => (
                                    <ListItem
                                        key={i}
                                        sx={{
                                            alignItems: "flex-start",
                                            color: "lightgrey",
                                            borderRadius: 1,
                                        }}
                                    >
                                        <Card className={"w-full text-start " + (c.letto ? " !bg-slate-500 !text-slate-300" : "!bg-yellow-100")}>
                                            <CardHeader className="!p-3" title={<Typography variant="body1">[{format(c.data)}]</Typography>} action={!c.letto && (
                                                <IconButton size="small" color="error" onClick={() => handleMarkAsRead(c)}>
                                                    <FiberManualRecord fontSize="small" />
                                                </IconButton>
                                            )} />
                                            <Divider />
                                            <CardContent className="!p-3 font-bold">{c.testo}</CardContent>
                                        </Card>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography className="!p-5 text-center">No news for now</Typography>
                        )}</CardContent>
                    {user?.role === "admin" && (
                        <>
                            <Divider />
                            <CardActions>
                                <OutlinedInput
                                    fullWidth
                                    size="small"
                                    sx={{ backgroundColor: "white", borderRadius: ".75em", mt: 1 }}
                                    placeholder="Write a new notification..."
                                    value={comunicato}
                                    onChange={(e) => setComunicato(e.target.value)}
                                    endAdornment={
                                        <IconButton size="small" onClick={handleSendComunicato}>
                                            <Send fontSize="small" />
                                        </IconButton>
                                    }
                                />
                            </CardActions>
                        </>)}
                </Card>
            </Popover>}
        </>
    );
}
