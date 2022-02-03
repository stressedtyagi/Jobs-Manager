import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

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

/**
 * @todo : Do something about resetting the data in TextFields after submitting the form
 */
const AddForm = () => {
    const [currStatus, setCurrStatus] = useState("pending");
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");

    return (
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
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
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
                    value={position}
                    onChange={(event) => setPosition(event.target.value)}
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
                    onChange={(event) => setCurrStatus(event.target.value)}
                    variant="standard"
                >
                    {status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 3 }}>
                Update
            </Button>
            <Button
                type="button"
                variant="contained"
                sx={{ mt: 2, mb: 3, ml: 5 }}
                onClick={() => {
                    setCompany("");
                    setPosition("");
                    setCurrStatus("pending");
                }}
            >
                Reset
            </Button>
        </Grid>
    );
};

export default AddForm;
