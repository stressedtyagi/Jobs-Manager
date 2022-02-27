// mui imports
import {
    Card,
    Box,
    Toolbar,
    Container,
    Grid,
    Backdrop,
    SpeedDial,
    SpeedDialIcon,
    CssBaseline,
} from "@mui/material";

// other imports
import { useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router";
import { useSnackbar } from "notistack";

// custom components import
import Loader from "../components/Loader";
import EditForm from "../components/EditForm";
import AddForm from "../components/AddForm";
import { JobCard } from "../components/JobCard";
import Notification from "../components/Notification";

// helpers and utils import
import auth from "../utils/auth";

/**
 * @prop {error,SetError} state - manages the error state that trigers custom notification
 * @prop {loading,SetLoading} state - manages the loading state that trigers custom loader
 * @prop {data,setData} state - contains all job data that is displayed on the dashboard
 * @prop {editJob, setEditJob} state - contains the job data that is being edited
 * @prop {backdrop, setBackdrop} state - turn on/off the backdrop for add new job btn
 * @prop {token,user,login,logout} outletContext - props coming from parent component (Skeleton) using useOutletContext hook
 * @returns
 */
function Dashboard() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(1);
    const [data, setData] = useState(null);
    const [editJob, setEditJob] = useState(null);
    const [backdrop, setBackdrop] = useState(false);
    const [token, user, login, logout] = useOutletContext();

    // hook used to display snackbar notifications (mui)
    const { enqueueSnackbar } = useSnackbar();

    // custom notification - using snackbar hook
    const notification = (data) => {
        enqueueSnackbar(data.msg, {
            variant: data.variant,
            autoHideDuration: "1000",
        });
    };

    // useEffect to fetch all jobs - at initial component mount
    useEffect(function fetchJobsAtInitialRender() {
        if (!data) {
            const params = { token: token };
            auth.get("/api/v1/jobs", params)
                .then(({ data }) => {
                    setData(data);
                    setLoading(0);
                })
                .catch((err) => {
                    const { msg } = err.response.data;
                    setError({ type: "error", msg: msg || err.response.data });
                    logout();
                });
        }
    }, []);

    /**
     * @function handleDeleteJob - handles the delete job request
     * @param {item to be deleted} item
     * @returns null
     */
    const deleteJobHandler = (item) => (event) => {
        event.preventDefault();
        auth.delete(`/api/v1/jobs/${item._id}`, { token })
            .then(() => {
                // filter out the deleted job from the data array
                const newData = data.jobs.filter((itm) => itm._id !== item._id);
                // update state with new {count-1, newFilteredData}, and display notification
                setData({ count: data.count - 1, jobs: newData });
                notification({
                    msg: "Job deleted successfully",
                    variant: "error",
                });
            })
            .catch((err) => {
                const { msg } = err.response.data;
                setError({ type: "error", msg: msg || err.response.data });
                console.dir(err);
            });
    };

    /**
     * @function handleEditJob - handles the edit job request
     * @param {item to edit} item
     * @returns null
     */
    const editJobHandler = (item) => (event) => {
        event.preventDefault();
        // set editJob state to the item that is being edited - will render EditForm component
        setEditJob(item);
    };

    /**
     * @function handleAddJob - handles the add job request
     * @param {item to be added} item
     * @returns null
     */
    const addJobHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // get all relevent form data
        const params = {
            data: {
                position: formData.get("position"),
                company: formData.get("company"),
                status: formData.get("status"),
            },
            token,
        };

        /**
         * @description send request to add new job
         * @response {data : jobs object} - contains the new job data
         */
        auth.post("/api/v1/jobs", params)
            .then(({ data: { job: newJob } }) => {
                // updatedJobs : array of jobs with new job added. First map all present jobs and then add the new job
                const updatedJobs = data.jobs.map((itm) => itm);
                updatedJobs.push(newJob);
                setData({ count: data.count + 1, jobs: updatedJobs });

                // reset backdrop to display dashboard and then display notification
                setBackdrop(false);
                notification({
                    msg: "Job added successfully",
                    variant: "success",
                });
            })
            .catch((err) => {
                const { msg } = err.response.data;
                setError({ type: "error", msg: msg || err.response.data });
                console.dir(err);
            });
    };

    /**
     * [BUG] : By the time Dashboard is rendered `user` state remains null
     * after render state gets some value
     * i.e by making call at /dashboard ..... / route is coming even when user is authenticated
     *          -> [TEMP SOLUTION] : Added Progress Bar until the `token` state is not null
     *                              i.e UseEffect is still making asyc call to authenticate `user`
     */

    /**
     * @todo: refractor the files that handle all these job requests calls to server
     */

    return (
        <>
            {/* user state:
                [set] : show loader until we fetch data from server
                [null] : check for token state, as maybe someone has entered random token in localStorage [authentication]
                    [token {state} : set] - maybe authentication route is still running in skeleton component - show loader 
                    [token {state} : null] - user is not logged in show home route 
                                            [this is when someone directly went to this route without 
                                            any token value on localStorage] */}
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
                    <CssBaseline />
                    <Box
                        component="main"
                        sx={{
                            background:
                                "#232526" /* fallback for old browsers */,
                            background:
                                "-webkit-linear-gradient(to right, #232526, #414345)" /* Chrome 10-25, Safari 5.1-6 */,
                            background:
                                "linear-gradient(to right, #232526, #414345)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
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
                                    }}
                                    icon={
                                        <SpeedDialIcon
                                            // event listener for speed dial icon (+ icon) [NOT SPEED DIAL Component]
                                            onClick={() =>
                                                setBackdrop(!backdrop)
                                            }
                                        />
                                    }
                                    /**
                                     * [Commented to alter the default action of SpeedDial]
                                     * onClose={() => setBackdrop(false)}
                                     * onOpen={() => setBackdrop(true)}
                                     */
                                    open={backdrop}
                                    direction="left"
                                >
                                    <AddForm
                                        state={[backdrop, setBackdrop]}
                                        addJob={addJobHandler}
                                    />
                                </SpeedDial>
                                {/* check data state 
                                    [null] : check for editJob state
                                        {editJob state} [set] : show EditForm, send props {job, data} states
                                        {editJob state} [null] : check if data state has any job or not - if not show notification
                                    [set] : map over all jobs and show job card */}
                                {!data ? (
                                    <Loader />
                                ) : editJob ? (
                                    <EditForm
                                        job={[editJob, setEditJob]}
                                        state={[data, setData]}
                                    />
                                ) : data.count === 0 ? (
                                    <>
                                        <Notification
                                            type="info"
                                            msg="There are no items to display"
                                        />
                                        <img
                                            src="https://i.imgur.com/L5jHP8f.gif"
                                            // [FUN] src="https://i.imgur.com/QsKU1KI.gif"
                                            alt="nothing to see here"
                                            width="70%"
                                        />
                                    </>
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
                                                <JobCard
                                                    item={item}
                                                    editJobHandler={
                                                        editJobHandler
                                                    }
                                                    deleteJobHandler={
                                                        deleteJobHandler
                                                    }
                                                />
                                            </Card>
                                        </Grid>
                                    ))
                                )}
                                {/* Completely seperate from other login, managing snackbar showing in bottom */}
                                {error ? (
                                    <Notification
                                        type={error.type}
                                        msg={error.msg}
                                    />
                                ) : (
                                    ""
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
