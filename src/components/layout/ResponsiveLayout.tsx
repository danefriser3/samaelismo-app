import React from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import NoticeBoard from "../NoticeBoard";
import { useAuth } from "../../contexts/AuthContext";
import LoginForm from "../LoginForm";
import { Book, CalendarMonth, Home, SupervisedUserCircle } from "@mui/icons-material";

const drawerWidth = 240;

export default function ResponsiveLayout() {
    const theme = useTheme();

    const { user, logout } = useAuth();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { label: "Home", path: "/home", icon: <Home fontSize="small" /> },
        { label: "Liber Spirae", path: "/liber-spirae", icon: <Book fontSize="small" /> },
        { label: "Calendar", path: "/calendar", icon: <CalendarMonth fontSize="small" /> },
    ];

    const userItems = [
        { label: "Diary", path: "/diary", icon: <Book fontSize="small" /> },
        { label: "Profile", path: "/profile", icon: <SupervisedUserCircle fontSize="small" /> },
    ]

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    My App
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {user && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate("/diary");
                                    if (isMobile) setMobileOpen(false);
                                }}
                            >
                                <ListItemText primary={`Welcome, ${user.email.split("@")[0]}`} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                )}
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate(item.path);
                                if (isMobile) setMobileOpen(false);
                            }}
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
                    user && user.email !== 'guest' ? (
                        <>
                            {userItems.map((item) => (
                                <ListItem key={item.label} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate(item.path);
                                            if (isMobile) setMobileOpen(false);
                                        }}
                                    >
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>
                            )
                            )}
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        // Handle logout logic here
                                        // For example, you might call a logout function from your auth context
                                        logout();
                                        if (isMobile) setMobileOpen(false);
                                    }}
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
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "space-between", width: "100%" }}>
                        <Typography variant="h6" noWrap component="div">
                            Dashboard
                        </Typography>

                        <NoticeBoard />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}
                    open={isMobile ? mobileOpen : true}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
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
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar /> {/* Spazio per l'AppBar */}
                <Outlet />
            </Box>
        </Box>
    );
}
