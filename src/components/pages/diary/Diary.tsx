import { Send } from "@mui/icons-material";
import { Card, CardHeader, CardContent, Typography, OutlinedInput, IconButton } from "@mui/material";
import { useState } from "react";

const Diary = () => {
    const [commento, setCommento] = useState('');
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "10px", gap: "10px" }}>
            <Card>
                <CardHeader title="Diary" />
                <CardContent>
                    <Typography variant="subtitle2" gutterBottom textAlign={"start"}>
                        Your Thought
                    </Typography>
                    <OutlinedInput
                        id="diary-comment"
                        fullWidth
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: ".75em" }}
                        placeholder="Leave your thought..."
                        value={commento}
                        onChange={(e) => setCommento(e.target.value)}
                        endAdornment={
                            <IconButton size="small" onClick={() => { }}>
                                <Send fontSize="small" />
                            </IconButton>
                        }
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default Diary;
