import { useMutation, useQuery } from "@apollo/client";
import Close from "@mui/icons-material/Close";
import Send from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import { CREA_VOCE_DIARIO, GET_DIARIO_PER_UTENTE, CANCELLA_VOCE_DIARIO, VociDiarioResponse } from "../../../data/queries";
import { useAuth } from "../../../contexts/AuthContext";

const Diary = () => {
    const { user } = useAuth();
    const [commento, setCommento] = useState('');
    const [filter, setFilter] = useState<'all' | 'mine' | 'others'>('all');

    const [vociFiltrate, setVociFiltrate] = useState<any[]>([]);

    const { data, refetch, loading } = useQuery<
        VociDiarioResponse,
        { user: string }
    >(GET_DIARIO_PER_UTENTE, {
        variables: { user: user?.email || '' },
    });

    const [creaVoceDiario] = useMutation(CREA_VOCE_DIARIO, {
        refetchQueries: ['vociDiarioPerUtente'],
    });

    const [cancellaVoceDiario] = useMutation(CANCELLA_VOCE_DIARIO, {
        refetchQueries: ['vociDiarioPerUtente'],
    });

    const handleSend = async () => {
        if (!commento.trim()) return;
        await creaVoceDiario({
            variables: {
                testo: commento,
                visibileA: [],
                created_by: user?.email,
            },
            onCompleted: () => {
                refetch();
            },
        });
        setCommento('');
    };

    const handleDelete = async (id: string) => {
        await cancellaVoceDiario({ variables: { id } });
        refetch();
    };

    useEffect(() => {
        if (data?.vociDiarioPerUtente) {
            let filteredData = data.vociDiarioPerUtente;
            if (filter === 'mine') {
                filteredData = filteredData.filter((voce: any) => voce.created_by === user?.email);
            } else if (filter === 'others') {
                filteredData = filteredData.filter((voce: any) => voce.created_by !== user?.email);
            }
            setVociFiltrate(filteredData);
        }
    }, [data, filter, user]);

    return (
        <Card className='root-card'>
            <CardHeader title="Diary" />
            <CardContent>
                <OutlinedInput
                    id="diary-comment"
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white", borderRadius: ".75em" }}
                    placeholder="Leave your thought..."
                    value={commento}
                    onChange={(e) => setCommento(e.target.value)}
                    endAdornment={
                        <IconButton size="small" onClick={handleSend}>
                            <Send fontSize="small" />
                        </IconButton>
                    }
                />
            </CardContent>
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <ToggleButtonGroup
                        disabled={loading}
                        value={filter}
                        exclusive
                        onChange={(_, val) => val && setFilter(val)}
                        size="small"
                    >
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="mine">Mine</ToggleButton>
                        <ToggleButton value="others">Others</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Stack spacing={2}>
                    {loading &&
                        <Skeleton variant="rounded" height={60} />}
                    {vociFiltrate.map((voce: any) => (
                        <Card key={voce.id} className={voce.created_by !== user?.email ? "text-start !bg-green-200" : "text-start !bg-gray-400"}>
                            <CardHeader className="!p-3" title={<Typography>[{voce.created_at}]</Typography>}
                                action={voce.created_by === user?.email && <IconButton size="small" onClick={() => handleDelete(voce.id)} sx={{ color: "black" }}>
                                    <Close fontSize="small" sx={{ fontWeight: "bold" }} />
                                </IconButton>} />
                            <Divider />
                            <CardContent className="!p-3">
                                {voce.testo}
                            </CardContent>
                            <CardContent className="!p-3">
                                <Typography variant="caption">
                                    {voce.created_by === user?.email && <>Visible to: {voce.visibile_a}</>}
                                    {voce.created_by !== user?.email && <>Created by: {voce.created_by}</>}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default Diary;
