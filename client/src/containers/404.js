import { Button, Container, Grid, Typography } from "@mui/material";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto-mono";
import { useNavigate } from "react-router";

const Page404 = () => {
    const navigator = useNavigate();
    return (
        <Container>
            <Grid
                container
                direction="row"
                height="100vh"
                justifyContent="center"
                alignItems="center"
                position="relative"
            >
                <Grid
                    item
                    container
                    xs={12}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: "Roboto Mono",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -350px)",
                        }}
                    >
                        404
                    </Typography>
                    <img
                        src={require("../assets/notFound.gif")}
                        alt="loading..."
                        width="100%"
                    />
                    <Typography
                        gutterBottom
                        variant="body1"
                        textAlign="center"
                        sx={{
                            fontFamily: "Roboto Mono",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, 250px)",
                        }}
                    >
                        Look like you're lost the page you are looking for not
                        available!
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{
                            fontFamily: "Roboto Mono",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, 310px)",
                        }}
                        onClick={() => navigator("/")}
                    >
                        Go to Home
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Page404;
