import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/home.jpg"})`,
        backgroundRepeat: "no-repeat",
    },
}));

const Home = () => {
    const classes = useStyles();
    return <div className={classes.root}>HOME</div>;
};

export default Home;
