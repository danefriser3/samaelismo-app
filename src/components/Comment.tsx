import React from "react";
import Close from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { VersiCommentati } from "../data";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../data";
import { useAuth } from "../contexts/AuthContext";

const Comment = React.memo(({ verso, onDeleted }: { verso: VersiCommentati, onDeleted: () => void }) => {

    const { user } = useAuth();

    // Verifica sicura del proprietario del commento
    const isCommentOwner = React.useMemo(() => {
        if (!user) return false;
        
        try {
            return user.username === verso.user ||
                   (user.email && user.email.split('@')[0] === verso.user);
        } catch {
            return false;
        }
    }, [user, verso.user]);

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        variables: { id: verso.id },
        onCompleted: () => {
            onDeleted();
        },
    });

    const handleDelete = React.useCallback(() => {
        if (window.confirm("Vuoi cancellare questo commento?")) {
            deleteComment();
        }
    }, [deleteComment]);

    return (
        <Card sx={{ backgroundColor: 'dimgrey !important', color: 'lightgrey' }}>
            <CardHeader className="!p-3" title={<Typography textAlign={"start"}>[{verso.data_commento}]</Typography>} action={isCommentOwner && <IconButton size="small" onClick={handleDelete} sx={{ color: "red" }}>
                <Close fontSize="small" sx={{ color: "white", fontWeight: "bold" }} />
            </IconButton>} />
            <Divider />
            <CardContent className="!p-3 text-start">
                <p>{verso.commento}</p>
            </CardContent>
            <CardContent className="!p-3 text-start">
                <i>~ <u>{verso.user}</u></i>
            </CardContent>
        </Card>
    );
});

Comment.displayName = 'Comment';

export default Comment;