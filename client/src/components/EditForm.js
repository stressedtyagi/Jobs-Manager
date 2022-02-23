// mui imports
import {
    Grid,
    Typography,
    Container,
    Paper,
    TextField,
    MenuItem,
    Button,
} from "@mui/material";
import { Box } from "@mui/system";

// react/other imports
import { useState } from "react";
import { useSnackbar } from "notistack";

// helpers and utils import
import auth from "../utils/auth";
import browserActions from "../utils/browserActions";
import { status } from "../helpers/jobStatus";

/**
 * @props {job, state} - job State has job to edit and state contains data component from parent
 * @returns EditForm when we click edit btn
 */
const EditForm = ({ job, state }) => {
    const [editJob, setEditJob] = job;
    const [data, setData] = state;
    const [currStatus, setCurrStatus] = useState(editJob.status);

    // snackbar displayed on each update of data
    const { enqueueSnackbar } = useSnackbar();

    // event handler for updating job status
    const handleUpdate = async (event) => {
        event.preventDefault();
        const newFormData = new FormData(event.currentTarget);
        const updates = {};
        /**
         * loop through all the keys of edit job state
         * and check there is any change in the old data
         * and new data entered in form
         * If there is any change then add it to updates object
         * */
        for (const obj in editJob) {
            const newData = newFormData.get(obj);
            if (newData && newData !== editJob[obj]) {
                updates[obj] = newData;
            }
        }

        /**
         * if there is any change in status then update it
         * the call update route to server
         * */

        if (Object.keys(updates).length !== 0) {
            try {
                const {
                    data: { job: updatedJob },
                } = await auth.patch(`/api/v1/jobs/${editJob._id}`, {
                    data: {
                        ...updates,
                    },
                    token: browserActions.getLocalStorage("token"),
                });
                const newData = data.jobs.map((job) => {
                    return job._id === updatedJob._id ? updatedJob : job;
                });

                setData({ count: data.count, jobs: newData });
                // on successful update show snackbar
                enqueueSnackbar("Job updated successfully", {
                    variant: "info",
                    autoHideDuration: "1000",
                });
            } catch (err) {}
        }
    };

    return (
        <>
            <Container
                component="main"
                maxWidth="sm"
                sx={{ background: "white", borderRadius: 1.5 }}
            >
                <Paper
                    variant="outlined"
                    sx={{
                        my: { xs: 3, md: 3 },
                        p: { xs: 2, md: 2 },
                        background: "#1976d2",
                        color: "white",
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ fontWeight: "bold" }}
                    >
                        Edit Job
                    </Typography>
                </Paper>
                <Typography variant="h6" gutterBottom>
                    Job Details
                </Typography>
                <Box component="form" onSubmit={handleUpdate}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                required
                                id="company"
                                name="company"
                                label="Company Name"
                                fullWidth
                                autoComplete="cc-name"
                                variant="standard"
                                defaultValue={editJob.company}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="position"
                                name="position"
                                label="Position"
                                fullWidth
                                autoComplete="cc-text"
                                variant="standard"
                                defaultValue={editJob.position}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                select
                                id="status"
                                name="status"
                                label="Current Status"
                                helperText="Select current Job status"
                                fullWidth
                                value={currStatus}
                                onChange={(event) =>
                                    setCurrStatus(event.target.value)
                                }
                                variant="standard"
                            >
                                {status.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2, mb: 3 }}
                            >
                                Update
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 2, mb: 3, ml: 5 }}
                                onClick={() => setEditJob(null)}
                            >
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default EditForm;
