import {
    Button,
    Box,
    Grid,
    MenuItem,
    TextField,
    Dialog,
    AppBar,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Divider,
    IconButton,
    Typography,
    Slide,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormLabel-root": {
            color: "white", // or black
        },
    },
}));

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

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @todo : Do something about resetting the data in TextFields after submitting the form
 */
const AddForm = ({ state }) => {
    const [currStatus, setCurrStatus] = useState("pending");
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const classes = useStyles();
    const [backdrop, setBackdrop] = state;
    const [open, setOpen] = useState(true);

    useEffect(
        function controlDialog() {
            setOpen(backdrop);
        },
        [backdrop]
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setBackdrop(false);
    };

    const handleSubmit = async (event) => {};

    return (
        <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
            <DialogTitle>Add Job</DialogTitle>
            <DialogContent>
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
                            // className={classes.root}
                            // inputProps={{ style: { color: "white" } }}
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
                        setCompany("");
                        setPosition("");
                        setCurrStatus("pending");
                    }}
                >
                    Reset
                </Button>
            </DialogActions>
        </Dialog>
        // <Box
        //     component="form"
        //     noValidate
        //     onSubmit={handleSubmit}
        //     sx={{
        //         mt: 3,
        //         background: "white",
        //         borderColor: "blue",
        //         borderRadius: 3,
        //     }}
        // >
        //     <Grid container spacing={3}>
        //         <Grid item xs={12} md={12}>
        //             <TextField
        //                 required
        //                 id="company"
        //                 name="company"
        //                 label="Company Name"
        //                 fullWidth
        //                 autoComplete="cc-name"
        //                 variant="standard"
        //                 value={company}
        //                 onChange={(event) => setCompany(event.target.value)}
        //                 // className={classes.root}
        //                 // inputProps={{ style: { color: "white" } }}
        //             />
        //         </Grid>
        //         <Grid item xs={12} md={6}>
        //             <TextField
        //                 required
        //                 id="position"
        //                 name="position"
        //                 label="Position"
        //                 fullWidth
        //                 autoComplete="cc-text"
        //                 variant="standard"
        //                 value={position}
        //                 onChange={(event) => setPosition(event.target.value)}
        //             />
        //         </Grid>

        //         <Grid item xs={12} md={6}>
        //             <TextField
        //                 required
        //                 select
        //                 id="status"
        //                 name="status"
        //                 label="Current Status"
        //                 helperText="Select current Job status"
        //                 fullWidth
        //                 value={currStatus}
        //                 onChange={(event) => setCurrStatus(event.target.value)}
        //                 variant="standard"
        //             >
        //                 {status.map((option) => (
        //                     <MenuItem key={option.value} value={option.value}>
        //                         {option.label}
        //                     </MenuItem>
        //                 ))}
        //             </TextField>
        //         </Grid>
        //         <Grid item xs={12} md={6}>
        //             <Button
        //                 type="submit"
        //                 variant="contained"
        //                 sx={{ mt: 2, mb: 3 }}
        //             >
        //                 Update
        //             </Button>
        //             <Button
        //                 type="button"
        //                 variant="contained"
        //                 sx={{ mt: 2, mb: 3, ml: 5 }}
        //                 onClick={() => {
        //                     setCompany("");
        //                     setPosition("");
        //                     setCurrStatus("pending");
        //                 }}
        //             >
        //                 Reset
        //             </Button>
        //         </Grid>
        //     </Grid>
        // </Box>
    );
};

export default AddForm;
