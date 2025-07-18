import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { feste, getFestivitaOrdinata, isDateInInterval, mmddToNumber } from "../data/liturgical-calendar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";
import { useState } from "react";

export default function LiturgicalCalendar() {
    const festivitaOrdinate = getFestivitaOrdinata(feste);

    const [indice, setIndice] = useState(() => {
        const now = new Date();
        const todayNum = mmddToNumber(now.toISOString().slice(5, 10));
        const todayIdx = festivitaOrdinate.findIndex(({ startNum, endNum }) =>
            isDateInInterval(todayNum, startNum, endNum)
        );
        return todayIdx === -1 ? 0 : todayIdx;
    });

    const findFestivitaToday = () => {
        const now = new Date();
        const todayNum = mmddToNumber(now.toISOString().slice(5, 10));
        const todayIdx = festivitaOrdinate.findIndex(({ startNum, endNum }) =>
            isDateInInterval(todayNum, startNum, endNum)
        );
        return todayIdx === -1 ? 0 : todayIdx;
    };

    const festa = festivitaOrdinate[indice];

    return festa ? (
        <Card sx={{ backgroundColor: festa.info.backgroundColor, color: festa.info.textColor }}>
            <CardHeader
                title={"~ " + festa.nome + " ~"}
                subheader={<Typography variant="subtitle2" color={festa.info.textColor!}>{"season"}</Typography>}
            />
            <Divider variant="middle" />
            <CardContent sx={{ pt: 0 }}>
                <IconButton size="small" style={{ color: "inherit" }} onClick={() => setIndice((i) => (i - 1 + festivitaOrdinate.length) % festivitaOrdinate.length)}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton style={{ color: "inherit" }} onClick={() => setIndice(findFestivitaToday())}>
                    <TodayIcon />
                </IconButton>
                <IconButton size="small" style={{ color: "inherit" }} onClick={() => setIndice((i) => (i + 1) % festivitaOrdinate.length)}>
                    <ArrowForwardIcon />
                </IconButton>
                <p>
                    <em>
                        {festa.info.intervallo
                            ? `from ${festa.info.intervallo.start} to ${festa.info.intervallo.end}`
                            : `${festa.info.data.join(", ")}`}
                    </em>
                </p>
                {festa.info.backgroundColor &&
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
                        <strong>Color:</strong>
                        <p>{festa.info.color}</p>
                    </div>
                }
                {festa.info.archetipo &&
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "8px" }}>
                        <strong>Archetype:</strong>
                        <p>{festa.info.archetipo}</p>
                    </div>
                }
                {festa.info.rituale &&
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "8px" }}>
                        <strong>Ritual:</strong>
                        <p>{festa.info.rituale}</p>
                    </div>
                }
                <p className="mt-3"><strong>Description:</strong></p>
                <p> {festa.info.descrizione}</p>
            </CardContent>
        </Card>
    ) : (
        <p>Nessuna festività disponibile.</p>
    );
}
