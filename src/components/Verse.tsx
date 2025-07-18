import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Verso } from "../data/types"

interface VerseProp {
    verso: Verso;
}

const Verse = React.memo(({ verso }: VerseProp) => {

    return <Card className="mb-4 bg-slate-100">
        <CardContent>
            <h3 className="text-lg font-semibold">{verso.titolo}</h3>
            <p>{verso.testo}</p>
        </CardContent>
    </Card>
});

Verse.displayName = 'Verse';

export default Verse;