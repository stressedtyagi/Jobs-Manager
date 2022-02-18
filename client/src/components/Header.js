import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
    Chip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useState } from "react";
import { useNavigate } from "react-router";

import "@fontsource/roboto-mono";
import "@fontsource/anonymous-pro";
import "@fontsource/roboto";

const settings = ["Dashboard", "Logout"];

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1976d2",
        },
    },
});

function Header({ context }) {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [user, login, logout] = context;
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        if (setting.toLowerCase() === "logout") {
            logout();
        } else {
            navigate(`/${setting.toLowerCase()}`);
        }
        setAnchorElUser(null);
    };

    const handleCloseUserMenuMain = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => navigate("/")}
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src="/assets/logo-white.png"
                                sx={{ height: 35, width: 35 }}
                            />
                        </IconButton>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {
                                    xs: "none",
                                    md: "flex",
                                    justifyContent: "center",
                                },
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{
                                    fontWeight: "bold",
                                    fontFamily: "Roboto Mono",
                                }}
                            >
                                Jobify
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {user ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            {/* [TODO] Change src to user image */}
                                            {/* [TODO] Setup random bgcolor for each user */}
                                            <Avatar
                                                alt={user.name}
                                                // src="/static/images/avatar/2.jpg"
                                                children={
                                                    user.name.toUpperCase()[0] +
                                                    user.name.toUpperCase()[1]
                                                }
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenuMain}
                                    >
                                        <MenuItem>
                                            <Chip
                                                key="uname-chip"
                                                label={`${user.name.toUpperCase()}`}
                                            />
                                        </MenuItem>
                                        {settings.map((setting) => (
                                            <MenuItem
                                                key={setting}
                                                onClick={handleCloseUserMenu.bind(
                                                    this,
                                                    setting
                                                )}
                                            >
                                                <Typography textAlign="center">
                                                    {setting}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="contained"
                                        sx={{ mr: 2 }}
                                        onClick={() => navigate("/signin")}
                                    >
                                        SignIn
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate("/signup")}
                                    >
                                        SignUp
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}

export default Header;
