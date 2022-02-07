import { CssBaseline, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TypeWriter from "typewriter-effect";
import "../style.css";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/home.jpg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontSize: "150px",
        fontFamily: "Roboto Mono",
        color: "#484848",
    },
}));

const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Grid container item direction="column">
                <Grid
                    item
                    container
                    style={{ display: "flex", alignItems: "center" }}
                    direction="column"
                >
                    <TypeWriter
                        options={{
                            strings: ["Jobify"],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                    <Typography gutterBottom variant="h6">
                        One place to mange all your Jobs !
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
