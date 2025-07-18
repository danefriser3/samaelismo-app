import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useMutation, useQuery } from '@apollo/client';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Send from '@mui/icons-material/Send';

import { liberSpirae } from '../data/sacred-texts';
import { useAuth } from '../contexts/AuthContext';
import { VersiCommentati, Verso } from '../data/types';
import { ADD_COMMENT, GET_VERSO } from '../data/queries';
import { formatDate } from '../data/utils';
import Comment from './Comment';
import { sanitizeInput } from '../utils/validation';

export default function DailyVerse() {

    const { user } = useAuth();

    const [verse, setVerse] = useState<Verso>({ titolo: '', testo: '' });
    const [commento, setCommento] = useState('');
    const [show, setShow] = useState("Show comments");

    const [creaCommento] = useMutation(ADD_COMMENT);

    const { loading, error, data, refetch } = useQuery<
        { versiCommentati: VersiCommentati[] },
        { data: string; codice: string }
    >(GET_VERSO, {
        variables: {
            data: formatDate(new Date(), false),
            codice: verse.titolo,
        },
        skip: !verse.titolo,
    });

    useEffect(() => {
        // Estrai tutti i versi da tutti i capitoli
        const allVerses: Verso[] = [];
        
        liberSpirae.capitoli.forEach(capitolo => {
            capitolo.sezioni.forEach(sezione => {
                sezione.versi.forEach((versoText) => {
                    const match = versoText.match(/^([IVXLCDM]+:\d{3})\s+(.*)$/);
                    if (match) {
                        allVerses.push({
                            titolo: match[1],
                            testo: match[2]
                        });
                    }
                });
            });
        });

        if (allVerses.length > 0) {
            const today = new Date().toDateString();
            const hash = Array.from(today).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
            const index = hash % allVerses.length;
            setVerse(allVerses[index]);
        }
    }, []);

    const handleSendComment = async () => {
        if (!commento.trim()) return;
        
        // Sanitizza il commento
        const sanitizedComment = sanitizeInput(commento);
        if (!sanitizedComment.trim()) {
            console.warn('Commento non valido dopo sanitizzazione');
            return;
        }
        
        // Estrazione sicura del nome utente
        let whoWrote = 'guest';
        try {
            if (user?.username) {
                whoWrote = user.username;
            } else if (user?.email) {
                const emailParts = user.email.split('@');
                whoWrote = emailParts.length > 0 ? emailParts[0] : 'guest';
            }
        } catch (error) {
            console.error('Errore nell\'estrazione del nome utente:', error);
            whoWrote = 'guest';
        }
        
        try {
            await creaCommento({
                variables: {
                    commento: sanitizedComment,
                    codice: verse.titolo,
                    data: formatDate(new Date(), false),
                    data_commento: formatDate(new Date()),
                    user: whoWrote
                },
            });

            setCommento('');
            refetch();
        } catch (error) {
            console.error('Errore durante l\'invio del commento:', error);
        }
    };

    const toggleShow = () => {
        setShow(p => p === "Hide comments" ? "Show comments" : "Hide comments")
    }
    return (
        <Card className='root-card'>
            <CardHeader
                title="Daily verse from Liber Spirae"
            />
            <Divider variant="middle" />
            <CardContent><strong>[{verse.titolo}] -</strong> {verse.testo}</CardContent>
            <Divider variant='middle' />
            <Button size='small' endIcon={show === "Show comments" && <KeyboardArrowDown /> || <KeyboardArrowUp />} onClick={toggleShow}>{show} {data?.versiCommentati.length ? "(" + data?.versiCommentati.length + ")" : ""}</Button>
            {show === "Hide comments" && <CardContent>
                {(loading && <p>Loading...</p>) ||
                    (error && <p>Error: {error.message}</p>) ||
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <OutlinedInput
                            fullWidth
                            size="small"
                            sx={{ backgroundColor: "white", borderRadius: ".75em" }}
                            placeholder="Leave your thought..."
                            value={commento}
                            onChange={(e) => setCommento(e.target.value)}
                            endAdornment={
                                <IconButton size="small" onClick={handleSendComment}>
                                    <Send fontSize="small" />
                                </IconButton>
                            }
                        />
                        {data?.versiCommentati.map((verso, idx) => (
                            <Comment key={idx} verso={verso} onDeleted={() => refetch()} />
                        ))}
                    </div>
                }
            </CardContent>}
        </Card>
    );
}
