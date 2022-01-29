// mui imports
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

// other imports
import axios from "axios";
import { useState } from "react";
import { Navigate, useOutletContext } from "react-router";

// Custom Component imports
import Copyright from "./Copyright";

// Helper/utils Imports
import browserActions from "../utils/browserActions";

function SignIn() {
    const [error, setError] = useState("");
    const [token, user, login, logout] = useOutletContext();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await axios
            .post("/api/v1/auth/login", {
                email,
                password,
            })
            .catch((error) => {
                setError(error.response.data.msg);
            });

        const token = response?.data?.token;

        if (token) {
            const accessToken = "Bearer " + token;
            browserActions.setLocalStorage("token", accessToken);
            login(accessToken);
        }
    };

    return (
        <>
            {user ? (
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
