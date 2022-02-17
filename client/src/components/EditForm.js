import {
    Grid,
    Typography,
    Container,
    Paper,
    TextField,
    MenuItem,
    Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { useState } from "react";
import auth from "../utils/auth";
import browserActions from "../utils/browserActions";
import { status } from "../helpers/jobStatus";

const EditForm = ({ job, state }) => {
    const [editJob, setEditJob] = job;
    const [data, setData] = state;
    const [currStatus, setCurrStatus] = useState(editJob.status);

    const { enqueueSnackbar } = useSnackbar();

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
                    return job._id === updatedJob._id ? updatedJob : job;
                });

                setData({ count: data.count, jobs: newData });

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
