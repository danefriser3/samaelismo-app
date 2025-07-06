import { Button, Card, CardContent } from "@mui/material"
import { Verso } from "../data/types"
import { useState } from "react";
import Comments from "./Comments";

interface VerseProp {
    verso: Verso;
}

const Verse = ({ verso }: VerseProp) => {

    const [show, setShow] = useState(false);


    const showComments = () => {
        setShow(p => !p)
    }

    return <Card className="mb-4 bg-slate-100">
        <CardContent>
            <h3 className="text-lg font-semibold">{verso.titolo}</h3>
            <p>{verso.testo}</p>
        </CardContent>
        <CardContent>
            <Button variant="contained" color='secondary' onClick={showComments}>Check comments</Button>
        </CardContent>
        {show && <CardContent>
            <Comments codice={verso.titolo} />
        </CardContent>
        }
    </Card>
}

export default Verse;