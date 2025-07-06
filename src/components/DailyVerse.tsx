import { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, Divider, IconButton, OutlinedInput } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { KeyboardArrowDown, KeyboardArrowUp, Send } from '@mui/icons-material';

import liberSpirae from '../data/liberSpirae.json';
import { useAuth } from '../contexts/AuthContext';
import { VersiCommentati, Verso } from '../data/types';
import { ADD_COMMENT, GET_VERSO } from '../data/queries';
import { formatDate } from '../data/funcs';

interface Props {
    activeCard: string | null;
    setActiveCard: (key: string) => void;
}

export default function DailyVerse({ activeCard, setActiveCard }: Props) {
    const isOpen = activeCard === 'dailyverse';

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
        skip: !isOpen || !verse.titolo,
    });

    useEffect(() => {
        const parsed: Verso[] = liberSpirae.map((str) => {
            const match = str.match(/^([IVXLCDM]+:\d{3})\s+(.*)$/);
            return {
                titolo: match?.[1] || '???',
                testo: match?.[2] || str,
            };
        });

        const today = new Date().toDateString();
        const hash = Array.from(today).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
        const index = hash % parsed.length;

        setVerse(parsed[index]);
    }, []);

    const handleSendComment = async () => {
        if (!commento.trim()) return;

        await creaCommento({
            variables: {
                commento,
                codice: verse.titolo,
                data: formatDate(new Date(), false),
                data_commento: formatDate(new Date()),
                user: user?.email.split('@')[0] || 'guest',
            },
        });

        setCommento('');
        refetch();
    };

    const toggleShow = () => {
        setShow(p => p === "Hide comments" ? "Show comments" : "Hide comments")
    }
    return (
        <Card>
            <CardHeader
                title="Daily verse from Liber Spirae"
                onClick={() => setActiveCard(isOpen ? '' : 'dailyverse')}
                sx={{ cursor: 'pointer' }}
            />
            {isOpen && (
                <>
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
                                    <Card key={idx} sx={{ backgroundColor: 'white !important' }}>
                                        <CardContent sx={{ padding: "8px !important", textAlign: "start", fontSize: "14px" }}>
                                            <><strong>[{verso.data_commento}]</strong> <p>{verso.commento}</p></>
                                            <i>~ <u>{verso.user}</u></i>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        }
                    </CardContent>}
                </>
            )}
        </Card>
    );
}
