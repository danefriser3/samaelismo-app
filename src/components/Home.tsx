import { Container } from "@mui/material";
import DailyVerse from "./DailyVerse";
import { useState } from "react";

const Home = () => {

    const [activeCard, setActiveCard] = useState<string | null>("dailyverse");

    return (
        <>
            <Container maxWidth="sm" className="py-8 font-sans flex flex-col gap-2 justify-center align-center">
                <DailyVerse activeCard={activeCard} setActiveCard={setActiveCard} />
            </Container>
        </>
    );
};

export default Home;
