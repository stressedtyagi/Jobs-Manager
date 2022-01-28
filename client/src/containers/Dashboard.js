// mui imports
import {
    styled,
    createTheme,
    ThemeProvider,
    CssBaseline,
    Box,
    Toolbar,
    List,
    Divider,
    IconButton,
    Container,
    Grid,
    Paper,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// other imports
import { useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router";

// custom components import
import Copyright from "../components/Copyright";

// helpers and utils import
import { mainListItems, secondaryListItems } from "../helpers/listItems";
import auth from "../utils/auth";
import browserActions from "../utils/browserActions";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme();

function Dashboard() {
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(true);
    const [signedIn, setSignedIn] = useOutletContext();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    /**
     * TODO: [signedIn state] : dont let navbar change when dashboard is at loading state,
     *      currently dashboard and logout btn are appearing in navbar when dashboard is at loading state.
     */
    useEffect(() => {
        const params = { token: signedIn };
        const data = auth
            .get("/api/v1/jobs", params)
            .then((res) => {
                console.log("data: " + res.data);
                setAuthenticated(true);
            })
            .catch((err) => {
                const { msg } = err.response.data;
                console.dir(err.response.data.msg);
                setError(msg);
                setSignedIn(0);
            });
    });

    return (
        <>
            {!signedIn ? (
                <Navigate to="/signin" />
            ) : !authenticated ? (
                !error ? (
                    "LODING...."
                ) : (
                    error
                )
            ) : (
                <ThemeProvider theme={mdTheme}>
                    <Box sx={{ display: "flex" }}>
                        <CssBaseline />
                        <Drawer variant="permanent" open={open}>
                            <Toolbar
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    px: [1],
                                }}
                            >
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Toolbar>
                            <Divider />
                            <List>{mainListItems}</List>
                            <Divider />
                            <List>{secondaryListItems}</List>
                        </Drawer>
                        <Box
                            component="main"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.grey[100]
                                        : theme.palette.grey[900],
                                flexGrow: 1,
                                height: "100vh",
                                overflow: "auto",
                            }}
                        >
                            <Toolbar />
                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                <Grid container spacing={3}>
                                    {/* Chart */}
                                    <Grid item xs={12} md={8} lg={9}>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                height: 240,
                                            }}
                                        >
                                            COMPONENT - 1
                                        </Paper>
                                    </Grid>
                                    {/* Recent Deposits */}
                                    <Grid item xs={12} md={4} lg={3}>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                height: 240,
                                            }}
                                        >
                                            COMPONENT - 2
                                        </Paper>
                                    </Grid>
                                    {/* Recent Orders */}
                                    <Grid item xs={12}>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            COMPONENT - 3
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ pt: 4 }} />
                            </Container>
                        </Box>
                    </Box>
                </ThemeProvider>
            )}
        </>
    );
}

export default Dashboard;
