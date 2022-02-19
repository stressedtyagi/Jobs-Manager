// other package import
import { useState } from "react";
import { Navigate, useOutletContext } from "react-router";

// mui import
import {
    Alert,
    Avatar,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// custom file import
import auth from "../utils/auth";
import browserActions from "../utils/browserActions";

function SignUp() {
    const [token, user, login, logout] = useOutletContext();
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const userData = {
            name: `${formData.get("firstName")} ${formData.get("lastName")}`,
            email: formData.get("email"),
            password: formData.get("password"),
        };

        auth.post("/api/v1/auth/register", { data: userData })
            .then((response) => {
                const token = response?.data?.token;
                if (token) {
                    browserActions.removeLocalStorage("expiry");
                    const accessToken = "Bearer " + token;
                    browserActions.setLocalStorage("token", accessToken);
                    login(accessToken);
                }
            })
            .catch((error) => {
                setError(error?.response?.data?.msg);
            });
    };

    return (
        <div
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
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
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
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="allowExtraEmails"
                                                color="primary"
                                            />
                                        }
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            )}
        </div>
    );
}

export default SignUp;
