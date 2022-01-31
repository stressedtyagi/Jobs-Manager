// mui imports
import {
    styled,
    createTheme,
    ThemeProvider,
    CssBaseline,
    Box,
    Toolbar,
    List,
    Divider,
    IconButton,
    Container,
    Grid,
    Paper,
    CircularProgress,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// other imports
import { useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router";

// custom components import
import Copyright from "../components/Copyright";
import Loader from "../components/Loader";

// helpers and utils import
import { mainListItems, secondaryListItems } from "../helpers/listItems";
import auth from "../utils/auth";
import browserActions from "../utils/browserActions";

function Dashboard() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(1);
    const [open, setOpen] = useState(true);
    const [token, user, login, logout] = useOutletContext();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!data) {
            const params = { token: token };
            auth.get("/api/v1/jobs", params)
                .then(({ data }) => {
                    setData(data);
                    setLoading(0);
                })
                .catch((err) => {
                    const { msg } = err.response.data;
                    // setError(msg);
                    logout();
                });
        }
    }, []);

    /**
     * [BUG] : By the time Dashboard is rendered `user` state remains null
     * after render state gets some value
     * i.e by making call at /dashboard ..... / route is coming even when user is authenticated
     *          -> [TEMP SOLUTION] : Added Progress Bar until the `token` state is not null
     *                              i.e UseEffect is still making asyc call to authenticate `user`
     */

    /**
     * [TODO] : Aligning Items to center
     */

    return (
        <Grid
            container
            direction="column"
            minHeight="100vh"
            border="1px solid black"
            height="100vh"
            justifyContent="center"
        >
            {!user ? (
                !token ? (
                    <Navigate to="/" />
                ) : (
                    <Grid item border="1px solid blue" alignSelf="center">
                        <Loader color="secondary" />
                    </Grid>
                )
            ) : loading ? (
                <Grid item border="1px solid blue" alignSelf="center">
                    <Loader color="success" />
                </Grid>
            ) : (
                <>
                    <Grid item xs={4} alignSelf="stretch">
                        <Paper
                            style={{
                                width: "inherit",
                                background: "red",
                            }}
                        ></Paper>
                    </Grid>
                    <Grid item xs={8} alignSelf="stretch">
                        <Paper
                            style={{
                                width: "inherit",
                                background: "yellow",
                            }}
                        ></Paper>
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default Dashboard;
