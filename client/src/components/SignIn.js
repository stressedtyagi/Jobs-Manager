import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "./Copyright";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useOutletContext } from "react-router";

function SignIn() {
    // Old signin state : locally build
    // const [signin, setSignin] = useState(0);

    const [error, setError] = useState("");
    const [signedIn, setSignedIn] = useOutletContext();

    /*
     * Checking value of signedIn State
     */
    // console.log("SignIn : " + signedIn);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const data = await axios
            .post("/api/v1/auth/login", {
                email,
                password,
            })
            .catch((error) => {
                /*
                 *Error Dubug Code
                 */
                // console.dir(error.response.data.msg);
                // console.dir(error.response.status);
                setError(error.response.data.msg);
            });

        const token = data?.data?.token;
        if (token) {
            const accessToken = "Bearer " + token;
            // setSignin(1);
            setSignedIn(1);
            window.localStorage.setItem("token", accessToken);
        }
    };

    /**
     * NOTE: THIS IS USELESS CODE HERE :) IDK WHY ALSO ...
     */
    // useEffect(() => {
    //     const token = window.localStorage.getItem("token");
    //     if (token) {
    //         // setSignin(1);
    //         console.log("SIGNIN COMP : " + signedIn);
    //         setSignedIn(1);
    //     }
    // });

    return (
        <>
            {signedIn ? (
                <Navigate to="/dashboard" />
            ) : (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {error ? (
                            <Alert
                                severity="error"
                                onClose={() => {
                                    setError("");
                                }}
                            >
                                {error}
                            </Alert>
                        ) : (
                            ""
                        )}
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            )}
        </>
    );
}

export default SignIn;
