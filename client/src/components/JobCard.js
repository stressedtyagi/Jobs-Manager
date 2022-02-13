import {
    Paper,
    Button,
    CardActions,
    CardContent,
    Chip,
    IconButton,
    Tooltip,
    Typography,
    Grow,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const colorMap = {
    pending: "#FFC900",
    interview: "#00EAD3",
    declined: "#DF2E2E",
    accepted: "#689F38",
};

const styles = {
    date: {
        alignSelf: "right",
        textAlign: "right",
    },
    cardAction: {
        display: "grid",
        gridAutoFlow: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    btn: {
        justifyContent: "flex-start",
        fontWeight: "bold",
    },
};

export const JobCard = ({ item, editJobHandler, deleteJobHandler }) => (
    <Grow
        in={true}
        style={{
            transformOrigin: "0 0 0",
        }}
        timeout={1200}
    >
        <CardContent
            sx={{ backgroundColor: colorMap[item.status], padding: 0 }}
        >
            <CardContent sx={{ backgroundColor: "white" }}>
                <Tooltip title="Delete">
                    <IconButton
                        aria-label="delete"
                        size="medium"
                        onClick={deleteJobHandler(item)}
                    >
                        <HighlightOffIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Typography
                    variant="body2"
                    sx={styles.date}
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
            <CardActions sx={styles.cardAction}>
                <Tooltip title="Edit">
                    <Button
                        size="small"
                        sx={styles.btn}
                        onClick={editJobHandler(item)}
                    >
                        EDIT
                    </Button>
                </Tooltip>
                <Chip
                    label={item.status.toUpperCase()}
                    sx={{
                        backgroundColor: colorMap[item.status],
                    }}
                />
            </CardActions>
        </CardContent>
    </Grow>
);
