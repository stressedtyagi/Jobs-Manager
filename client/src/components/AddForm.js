// mui imports
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
import CancelIcon from "@mui/icons-material/Cancel";

// react/other imports
import { useEffect, useState } from "react";

// helpers and utils import
import { status } from "../helpers/jobStatus";

/**
 * @info Component used for making dialog draggable
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

// Consists of all styles in page
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

/**
 * @props {state,addJob} props are passed from parent component
 * @param {currStatus, company, position} controllers Managing input value inside the form
 * @returns AddForm when we click on Spinner
 */
const AddForm = ({ state, addJob }) => {
    const [currStatus, setCurrStatus] = useState("pending");
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");

    /**
     * @param {Backdrop} state that is passed as props from Dashboard component
     * @param {open} state manages visibility of Dialog
     */
    const [backdrop, setBackdrop] = state;
    const [open, setOpen] = useState(true);

    // Whenever backdrop is added or removed change the visibility of {open} state
    useEffect(
        function controlDialog() {
            setOpen(backdrop);
        },
        [backdrop]
    );

    // Event handler for clear button
    const clearState = () => {
        setCompany("");
        setPosition("");
        setCurrStatus("pending");
    };

    // Event handler for close button
    const handleClose = () => {
        setOpen(false);
        setBackdrop(false);
    };

    // Event handler for submit button
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
                            {/* Maping over the all possible status i.e. coming from 
                                status helper function */}
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
                    Add Job
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
