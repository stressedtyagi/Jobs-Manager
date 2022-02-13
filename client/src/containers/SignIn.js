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

// other package imports
import { useState } from "react";
import { Navigate, useOutletContext } from "react-router";

// Helper/utils Imports
import browserActions from "../utils/browserActions";
import auth from "../utils/auth";

function SignIn() {
    const [error, setError] = useState("");
    const [token, user, login, logout] = useOutletContext();

    /**
     * @note did a trick here while implementing rememberMe functionality
     * added a key['expiry'] in localStorage with value as current time + 10hrs
     * now if we try to comeback after 10 hrs the system will automatically logout us
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        const rememberMe = formData.get("rememberMe");
        const data = { email, password };

        auth.post("/api/v1/auth/login", { data })
            .then((response) => {
                const token = response?.data?.token;

                if (token) {
                    if (!rememberMe) {
                        const now = new Date();
                        now.setHours(now.getHours() + 10);
                        browserActions.setLocalStorage("expiry", now.getTime());
                    } else {
                        // remove previous expiry key if present
                        browserActions.removeLocalStorage("expiry");
                    }

                    const accessToken = "Bearer " + token;
                    browserActions.setLocalStorage("token", accessToken);
                    login(accessToken);
                }
            })
            .catch((error) => {
                setError(error.response.data.msg);
            });
    };

    return (
        <Box
            style={{
                border: "0.1px solid black",
                minHeight: "100vh",
                background: "#ECE9E6" /* fallback for old browsers */,
                background:
                    "-webkit-linear-gradient(to right, #FFFFFF, #ECE9E6)" /* Chrome 10-25, Safari 5.1-6 */,
                background:
                    "linear-gradient(to right, #FFFFFF, #ECE9E6)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
            }}
        >
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
                                        color="primary"
                                        name="rememberMe"
                                        id="rememberMe"
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
                </Container>
            )}
        </Box>
    );
}

export default SignIn;
