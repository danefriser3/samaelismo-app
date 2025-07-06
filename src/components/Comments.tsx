import { Card, CardContent, Stack } from "@mui/material"
import { VersiCommentati } from "../data/types"
import { useQuery } from "@apollo/client";
import { GET_VERSO } from "../data/queries";

interface CommentsProps {
    codice: string;
}

const Comments = ({ codice }: CommentsProps) => {

    const { data } = useQuery<
        { versiCommentati: VersiCommentati[] },
        { codice: string }
    >(GET_VERSO, {
        variables: {
            codice: codice,
        }
    });

    return <Stack direction={"column"} gap={1}>
        {
            data?.versiCommentati.map((verso, idx) => (
                <Card key={idx} sx={{ backgroundColor: 'white !important' }}>
                    <CardContent sx={{ padding: "8px !important", textAlign: "start", fontSize: "14px" }}>
                        <><strong>[{verso.data_commento}]</strong> <p>{verso.commento}</p></>
                        <i>~ <u>{verso.user}</u></i>
                    </CardContent>
                </Card>
            ))
        }
        {
            data?.versiCommentati.length === 0 &&
            <Card sx={{ backgroundColor: 'white !important' }}>
                <CardContent sx={{ padding: "8px !important", textAlign: "center", fontSize: "14px" }}>
                    No Comment yet.
                </CardContent>
            </Card>
        }
    </Stack>

}

export default Comments;