import {
    Button,
    Grid,
    MenuItem,
    TextField,
    Dialog,
    IconButton,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Paper,
} from "@mui/material";
import Draggable from "react-draggable";

import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import { status } from "../helpers/jobStatus";

/**
 * @info making dialog draggable
 */
function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const styles = {
    dialogTitle: {
        background: "#1565C0",
        fontWeight: "bold",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        cursor: "move",
    },
    closeIcon: {
        justifySelf: "flex-end",
    },
};

const AddForm = ({ state, addJob }) => {
    const [currStatus, setCurrStatus] = useState("pending");
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");

    const [backdrop, setBackdrop] = state;
    const [open, setOpen] = useState(true);

    useEffect(
        function controlDialog() {
            setOpen(backdrop);
        },
        [backdrop]
    );

    const clearState = () => {
        setCompany("");
        setPosition("");
        setCurrStatus("pending");
    };

    const handleClose = () => {
        setOpen(false);
        setBackdrop(false);
    };

    const handleSubmit = (event) => {
        clearState();
        addJob(event);
    };

    return (
        <Dialog
            component="form"
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            onSubmit={handleSubmit}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle
                sx={{ ...styles.dialogTitle }}
                id="draggable-dialog-title"
            >
                Add Job
                <IconButton
                    sx={{ ...styles.closeIcon }}
                    onClick={() => setBackdrop(false)}
                >
                    <CancelIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                <DialogContentText>
                    Fill the following form to add new job to you account
                </DialogContentText>
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
                            onChange={(event) =>
                                setPosition(event.target.value)
                            }
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
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained" sx={{ mt: 2, mb: 3 }}>
                    Update
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 2, mb: 3, ml: 5 }}
                    onClick={() => {
                        clearState();
                    }}
                >
                    Reset
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddForm;
