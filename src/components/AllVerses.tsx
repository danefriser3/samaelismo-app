import { useState } from 'react';
import {
    Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem,
    OutlinedInput, Pagination, Select, Typography
} from '@mui/material';
import { liberSpirae } from '../data/liber';
import Verse from './Verse';

const PER_PAGE = 10;

const AllVerses = () => {
    const [selectedCapitolo, setSelectedCapitolo] = useState('First Spira');
    const [selectedSezione, setSelectedSezione] = useState('001 - 020');
    const [page, setPage] = useState(1);

    const capitolo = liberSpirae.capitoli.find(c => c.titolo === selectedCapitolo);
    const sezione = capitolo?.sezioni.find(s => s.sezione === selectedSezione);
    const versi = sezione?.versi || [];

    const totalPages = Math.ceil(versi.length / PER_PAGE);
    const currentVerses = versi.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const handleCapitoloChange = (event: any) => {
        setSelectedCapitolo(event.target.value);
        if(event.target.value === 'Appendix') 
            setSelectedSezione('Philosophical Commentary on the Text');
        else
            setSelectedSezione('001 - 020');
        setPage(1);
    };

    const handleSezioneChange = (event: any) => {
        setSelectedSezione(event.target.value);
        setPage(1);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Card>
            <CardHeader title="Liber Spirae" />
            <CardContent>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Chapter</InputLabel>
                    <Select
                        size='small'
                        value={selectedCapitolo}
                        label="Chapter"
                        onChange={handleCapitoloChange}
                        input={<OutlinedInput label="Chapter"
                            sx={{ backgroundColor: "white", borderRadius: ".75em", boxShadow: '0.1em 0.1em 0.1em dimgrey' }} />}
                    >
                        {liberSpirae.capitoli.map((c: { titolo: string }) => (
                            <MenuItem key={c.titolo} value={c.titolo}>
                                {c.titolo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {capitolo && (
                    <>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {capitolo.descrizione}
                        </Typography>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Section</InputLabel>
                            <Select
                                size='small'
                                value={selectedSezione}
                                label="Section"
                                onChange={handleSezioneChange}
                                input={<OutlinedInput label="Section"
                                    sx={{ backgroundColor: "white", borderRadius: ".75em", boxShadow: '0.1em 0.1em 0.1em dimgrey' }} />}
                            >
                                {capitolo.sezioni.map((s: { sezione: string }) => (
                                    <MenuItem key={s.sezione} value={s.sezione}>
                                        {s.sezione}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>
                )}
                {sezione && (
                    <>
                        <Typography variant="body1" color='error' sx={{ mb: 2 }} fontWeight={'bold'}>
                            {sezione.sottotitolo}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {sezione.testo}
                        </Typography>

                        {totalPages > 1 && (
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}
                            />
                        )}

                        {currentVerses.map((str: string, idx: number) => {
                            const match = str.match(/^([IVXLCDM]+:\d{3})\s+(.*)$/);
                            const verso = {
                                titolo: match?.[1] || '???',
                                testo: match?.[2] || str,
                            };
                            return <Verse verso={verso} key={idx} />;
                        })}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default AllVerses;
