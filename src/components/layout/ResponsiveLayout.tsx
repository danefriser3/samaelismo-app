import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Book from "@mui/icons-material/Book";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Home from "@mui/icons-material/Home";
import SupervisedUserCircle from "@mui/icons-material/SupervisedUserCircle";
import { Outlet, useNavigate } from "react-router-dom";
import NoticeBoard from "../NoticeBoard";
import { useAuth } from "../../contexts/AuthContext";
import LoginForm from "../LoginForm";

// Costanti
const DRAWER_WIDTH = 240;
const GUEST_EMAIL = 'guest';
const APP_NAME = 'Samaelismo';

// Interfacce TypeScript
interface NavigationItem {
    label: string;
    path: string;
    icon: React.ReactElement;
}

export default function ResponsiveLayout() {
    const theme = useTheme();

    const { user, logout } = useAuth();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();

    // Funzione helper per ottenere il nome da visualizzare dell'utente
    const getUserDisplayName = (user: any) => {
        if (!user?.email) return 'Utente Sconosciuto';
        try {
            return user?.username ?? user.email.split("@")[0];
        } catch {
            return 'Utente Sconosciuto';
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Funzione ottimizzata per la navigazione
    const handleNavigation = (path: string) => {
        navigate(path);
        if (isMobile) setMobileOpen(false);
    };

    // Funzione ottimizzata per il logout
    const handleLogout = () => {
        logout();
        if (isMobile) setMobileOpen(false);
    };

    const navItems: NavigationItem[] = [
        { label: "Home", path: "/home", icon: <Home fontSize="small" /> },
        { label: "Liber Spirae", path: "/liber-spirae", icon: <Book fontSize="small" /> },
        { label: "Calendar", path: "/calendar", icon: <CalendarMonth fontSize="small" /> },
    ];

    const userItems: NavigationItem[] = [
        { label: "Diary", path: "/diary", icon: <Book fontSize="small" /> },
        { label: "Profile", path: "/profile", icon: <SupervisedUserCircle fontSize="small" /> },
    ];

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    {APP_NAME}
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {user && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary={`Benvenuto, ${getUserDisplayName(user)}`} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                )}
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            onClick={() => handleNavigation(item.path)}
                        >
                            <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
                {
                    user && user.email !== GUEST_EMAIL ? (
                        <>
                            {userItems.map((item) => (
                                <ListItem key={item.label} disablePadding>
                                    <ListItemButton
                                        onClick={() => handleNavigation(item.path)}
                                    >
                                        <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>
                            )
                            )}
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={handleLogout}
                                >
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        <LoginForm isMobile={isMobile} setMobileOpen={setMobileOpen} />
                    )
                }
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { md: `${DRAWER_WIDTH}px` },
                    background: "black"
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {/* Titolo + icona notifiche */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "end", width: "100%" }}>
                        <NoticeBoard />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}
                    open={isMobile ? mobileOpen : true}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: DRAWER_WIDTH,
                            boxSizing: "border-box",
                            background: "lightgray"
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 1,
                    width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                }}
            >
                <Toolbar /> {/* Spazio per l'AppBar */}
                <Container maxWidth="lg" className="font-sans flex flex-col gap-2 justify-center align-center">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}
