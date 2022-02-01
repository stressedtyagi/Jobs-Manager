// mui imports
import {
    Card,
    Chip,
    CardActions,
    CardContent,
    Button,
    Typography,
    Box,
    Toolbar,
    Container,
    Grid,
} from "@mui/material";

// other imports
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router";

// custom components import
import Copyright from "../components/Copyright";
import Loader from "../components/Loader";
import EditForm from "../components/EditForm";

// helpers and utils import
import auth from "../utils/auth";

const colorMap = {
    pending: "#fbc02d",
    interview: "#eb6e47",
    rejected: "#d32f2f",
    accepted: "#689f38",
};

const card = ({ item, editJobHandler }) => (
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
        <CardActions
            sx={{
                display: "grid",
                gridAutoFlow: "column",
                justifyContent: "space-between",
            }}
        >
            <Button
                size="small"
                style={{ justifyContent: "flex-start" }}
                onClick={editJobHandler(item)}
            >
                EDIT
            </Button>
            <Chip
                label={item.status.toUpperCase()}
                style={{
                    backgroundColor: colorMap[item.status],
                }}
            />
        </CardActions>
    </>
);

function Dashboard() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(1);
    const [data, setData] = useState(null);
    const [editJob, setEditJob] = useState(null);
    const [token, user, login, logout] = useOutletContext();

    useEffect(() => {
        if (!data) {
            const params = { token: token };
            auth.get("/api/v1/jobs", params)
                .then(({ data }) => {
                    setData(data);
                    setLoading(0);
                })
                .catch((err) => {
                    const { msg } = err.response.data;
                    logout();
                });
        }
    }, []);

    const editJobHandler = (item) => (event) => {
        event.preventDefault();
        setEditJob(item);
    };

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
                                ) : editJob ? (
                                    <EditForm data={editJob} />
                                ) : (
                                    data.jobs.map((item) => (
                                        <Grid
                                            item
                                            xs={12}
                                            md={4}
                                            lg={3}
                                            key={item._id}
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
                                                {card({ item, editJobHandler })}
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
