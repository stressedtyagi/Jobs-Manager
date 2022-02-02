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
import { useState } from "react";
import auth from "../utils/auth";
import browserActions from "../utils/browserActions";

const status = [
    {
        value: "pending",
        label: "Pending",
    },
    {
        value: "interview",
        label: "Interview",
    },
    {
        value: "declined",
        label: "Declined",
    },
    {
        value: "accepted",
        label: "Accepted",
    },
];

const EditForm = ({ job, state }) => {
    const [editJob, setEditJob] = job;
    const [data, setData] = state;
    const [currStatus, setCurrStatus] = useState(editJob.status);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const newFormData = new FormData(event.currentTarget);
        const updates = {};
        for (const obj in editJob) {
            const newData = newFormData.get(obj);
            if (newData && newData !== editJob[obj]) {
                updates[obj] = newData;
            }
        }
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
                    console.log(job);
                    return job._id === updatedJob._id ? updatedJob : job;
                });

                setData({ count: data.count, jobs: newData });
            } catch (err) {}
        }
    };

    /**
     * @todo: do some styling for the edit page
     * @todo: add toast for new update added
     */

    return (
        <>
            <Container
                component="main"
                maxWidth="sm"
                sx={{ mb: 4, border: "2px solid black" }}
            >
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 2 } }}
                >
                    <Typography variant="h5" align="center">
                        Edit Job
                    </Typography>
                </Paper>
                <Typography variant="h6" gutterBottom>
                    Job Details
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleUpdate}
                    // sx={{ border: "1px solid red" }}
                >
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
                            Cancel
                        </Button>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default EditForm;
