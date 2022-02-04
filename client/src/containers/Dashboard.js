// mui imports
import {
    Card,
    Chip,
    Tooltip,
    CardActions,
    CardContent,
    Button,
    Typography,
    Box,
    Toolbar,
    Container,
    Grid,
    IconButton,
    Backdrop,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// other imports
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router";

// custom components import
import Copyright from "../components/Copyright";
import Loader from "../components/Loader";
import EditForm from "../components/EditForm";
import AddForm from "../components/AddForm";

// helpers and utils import
import auth from "../utils/auth";

const colorMap = {
    pending: "#fbc02d",
    interview: "#eb6e47",
    rejected: "#d32f2f",
    accepted: "#689f38",
};

/**
 *
 * @todo correct stlying of card
 */
const card = ({ item, editJobHandler, deleteJobHandler }) => (
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
        </CardContent>
        <CardActions
            sx={{
                display: "grid",
                gridAutoFlow: "column",
                justifyContent: "space-between",
                // border: "1px solid black",
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
            <Tooltip title="Delete">
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={deleteJobHandler(item)}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </CardActions>
    </>
);

function Dashboard() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(1);
    const [data, setData] = useState(null);
    const [editJob, setEditJob] = useState(null);
    const [backdrop, setBackdrop] = useState(false);
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

    /**
     * @todo : refractor this code
     * @param {item to be deleted} item
     * @returns
     */
    const deleteJobHandler = (item) => (event) => {
        /**
         * @bug : some error with filter
         */
        event.preventDefault();
        auth.delete(`/api/v1/jobs/${item._id}`, { token })
            .then((res) => {
                const newData = data.jobs.filter((itm) => itm._id !== item._id);
                setData({ count: data.count - 1, jobs: newData });
            })
            .catch((err) => console.dir(err));
    };

    /**
     *
     * @param {item to edit} item
     * @returns null
     */
    const editJobHandler = (item) => (event) => {
        event.preventDefault();
        setEditJob(item);
    };

    /**
     * @todo : refractor this code
     * @param {item to be added} item
     * @returns
     */
    const addJobHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const params = {
            data: {
                position: formData.get("position"),
                company: formData.get("company"),
                status: formData.get("status"),
            },
            token,
        };
        auth.post("/api/v1/jobs", params)
            .then(({ data: { job: newJob } }) => {
                const updatedJobs = data.jobs.map((itm) => itm);
                updatedJobs.push(newJob);
                setData({ count: data.count + 1, jobs: updatedJobs });
                setBackdrop(false);
            })
            .catch((err) => console.log(err.msg));
    };

    /**
     * [BUG] : By the time Dashboard is rendered `user` state remains null
     * after render state gets some value
     * i.e by making call at /dashboard ..... / route is coming even when user is authenticated
     *          -> [TEMP SOLUTION] : Added Progress Bar until the `token` state is not null
     *                              i.e UseEffect is still making asyc call to authenticate `user`
     */

    /**
     * @todo: Add Functioning of delete button for each job card
     * @todo: Add New Job Creating functionality
     * @todo: do something for error state
     * @todo: add the copyright component to footer
     * @todo: refractor the files that handle all these job requests calls to server
     * @todo: Add confirmation before deleting a job
     * @todo: correct the logic used to update the ui when no jobs are present in data state
     * @bug : when on edit route at each refresh dashboard is appearing, do some changes with editJob
     * state initial value
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
                                <Backdrop open={backdrop} />
                                <SpeedDial
                                    ariaLabel="SpeedDial tooltip example"
                                    sx={{
                                        position: "absolute",
                                        bottom: 16,
                                        right: 16,
                                        border: "1px solid black",
                                    }}
                                    icon={
                                        <SpeedDialIcon
                                            onClick={() =>
                                                setBackdrop(!backdrop)
                                            }
                                        />
                                    }
                                    /**
                                     * Commented to alter the default action of SpeedDial
                                     *
                                     * onClose={() => setBackdrop(false)}
                                     * onOpen={() => setBackdrop(true)}
                                     */
                                    open={backdrop}
                                    direction="left"
                                >
                                    <Box
                                        visibility={
                                            backdrop ? "visible" : "hidden"
                                        }
                                        component="form"
                                        onSubmit={addJobHandler}
                                    >
                                        <AddForm />
                                    </Box>
                                </SpeedDial>
                                {!data ? (
                                    <Loader />
                                ) : editJob ? (
                                    <EditForm
                                        job={[editJob, setEditJob]}
                                        state={[data, setData]}
                                    />
                                ) : data.count === 0 ? (
                                    "ADD SOME COMPONENT FOR WHEN NO JOBS ARE HERE"
                                ) : (
                                    data.jobs.map((item) => (
                                        <Grid
                                            item
                                            xs={12}
                                            md={4}
                                            lg={3}
                                            key={item._id}
                                        >
                                            <Card
                                                variant="outlined"
                                                sx={{ boxShadow: 3 }}
                                            >
                                                {card({
                                                    item,
                                                    editJobHandler,
                                                    deleteJobHandler,
                                                })}
                                            </Card>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default Dashboard;
