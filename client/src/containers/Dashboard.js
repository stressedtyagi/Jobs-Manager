// mui imports
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Box,
    Toolbar,
    List,
    Divider,
    IconButton,
    Container,
    Grid,
    Paper,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// other imports
import { useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router";

// custom components import
import Copyright from "../components/Copyright";
import Loader from "../components/Loader";
import Drawer from "../components/Drawer";

// helpers and utils import
import { mainListItems } from "../helpers/listItems";
import auth from "../utils/auth";

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);

const card = (item) => (
    <>
        <CardContent>
            <Typography
                sx={{
                    fontSize: 14,
                    textAlign: "right",
                }}
                color="text.secondary"
                gutterBottom
            >
                {new Date(item.createdAt).toDateString("en-US")}
            </Typography>
            <Typography variant="h5" component="div">
                {item.company.toUpperCase()}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.position}
            </Typography>
            {/* <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
            </Typography> */}
        </CardContent>
        <CardActions>
            <Button size="small">EDIT</Button>
        </CardActions>
    </>
);

function Dashboard() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(1);
    const [token, user, login, logout] = useOutletContext();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!data) {
            const params = { token: token };
            auth.get("/api/v1/jobs", params)
                .then(({ data }) => {
                    console.log(data);
                    setData(data);
                    setLoading(0);
                })
                .catch((err) => {
                    const { msg } = err.response.data;
                    logout();
                });
        }
    }, []);

    /**
     * [BUG] : By the time Dashboard is rendered `user` state remains null
     * after render state gets some value
     * i.e by making call at /dashboard ..... / route is coming even when user is authenticated
     *          -> [TEMP SOLUTION] : Added Progress Bar until the `token` state is not null
     *                              i.e UseEffect is still making asyc call to authenticate `user`
     */

    /**
     * [TODO] : Add Functioning of edit, delete button for each job card
     * [TODO] : Add add Badge for [Pending, Interviewed ...] values
     * [TODO] : Add New Job Creating functionality
     */

    return (
        <>
            {!user ? (
                !token ? (
                    <Navigate to="/" />
                ) : (
                    <Loader color="secondary" />
                )
            ) : loading ? (
                <Loader color="success" />
            ) : (
                <Box sx={{ display: "flex" }}>
                    {/* <Drawer variant="permanent" open={open}>
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
                    </Drawer> */}
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
                                {!data ? (
                                    <Loader />
                                ) : (
                                    data.jobs.map((itm) => (
                                        <Grid
                                            item
                                            xs={12}
                                            md={4}
                                            lg={3}
                                            key={itm._id}
                                        >
                                            {/* <Paper
                                                sx={{
                                                    p: 2,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    height: 240,
                                                }}
                                                elevation={4}
                                            >
                                                {"<Deposits />"}
                                            </Paper> */}
                                            <Card
                                                variant="outlined"
                                                sx={{ boxShadow: 3 }}
                                            >
                                                {card(itm)}
                                            </Card>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default Dashboard;
