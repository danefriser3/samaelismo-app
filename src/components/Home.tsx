import { Container, IconButton, ListItem, ListItemText, MenuItem } from "@mui/material";
import DailyVerse from "./DailyVerse";
import LiturgicalCalendar from "./LiturgicalCalendar";
import NoticeBoard from "./NoticeBoard";
import { useState } from "react";
import LoginForm from "./LoginForm";
import AllVerses from "./AllVerses";
import { Description, HomeFilled, Logout, MenuBook, MoreVert } from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const history = useNavigate();
    const [activeCard, setActiveCard] = useState<string | null>("dailyverse");

    const [showBook, setShowBook] = useState(false);


    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px", gap: "10px" }}>
                <LoginForm />
                <IconButton
                    aria-label="menu"
                    onClick={handleMenuOpen}
                    sx={{ backgroundColor: "lightgrey" }}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={() => { setShowBook(sb => !sb); handleMenuClose(); }}>
                        {showBook ? <HomeFilled fontSize="small" /> : <MenuBook fontSize="small" />}
                    </MenuItem>
                    <NoticeBoard />
                    <MenuItem onClick={() => {
                        history("/diary");
                        handleMenuClose();
                    }}>
                        <Description fontSize="small" />
                    </MenuItem>
                </Menu>
            </div>
            <Container maxWidth="sm" className="py-8 font-sans flex flex-col gap-2 justify-center align-center">
                {showBook && <AllVerses /> || <>
                    <LiturgicalCalendar activeCard={activeCard} setActiveCard={setActiveCard} />
                    <DailyVerse activeCard={activeCard} setActiveCard={setActiveCard} />
                </>
                }
            </Container>
        </>
    );
};

export default Home;
