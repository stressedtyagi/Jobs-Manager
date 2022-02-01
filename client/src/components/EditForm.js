import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Typography,
} from "@mui/material";

/**
 * [NOTE]: Redundent Code, Make sperate file for the following fucntion
 */

const card = ({ item, editJobHandler }) => (
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
            <Typography variant="h5" component="div">
                EDIT ROUTE
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.position}
            </Typography>
            {/* <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
            </Typography> */}
        </CardContent>
        <CardActions
            sx={{
                display: "grid",
                gridAutoFlow: "column",
                justifyContent: "space-between",
            }}
        >
            <Button
                size="small"
                style={{ justifyContent: "flex-start" }}
                // onClick={editJobHandler(item)}
            >
                EDIT
            </Button>
            <Chip
                label={item.status.toUpperCase()}
                style={
                    {
                        // backgroundColor: colorMap[item.status],
                    }
                }
            />
        </CardActions>
    </>
);

const EditForm = ({ data }) => {
    console.log(data);
    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card variant="outlined" sx={{ boxShadow: 3 }}>
                {card({ item: data })}
            </Card>
        </Grid>
    );
};

export default EditForm;
