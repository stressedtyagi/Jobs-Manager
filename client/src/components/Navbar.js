import { Button } from "@mui/material";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const myStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    justifyItems: "center",
    gap: "20px",
    fontSize: "30px",
    fontFamily: "Roboto Mono",
    textDecoration: "none",
};

const Navbar = (props) => {
    const [signedIn, setSignedIn] = props.context;
    const navigate = useNavigate();

    /**
     * Debuging start
     */
    useEffect(() => {
        console.log("NAVBAR : " + signedIn);
    }, [signedIn]);
    /**
     * Debuging end
     */

    const handleLogOut = (event) => {
        window.localStorage.removeItem("token");
        navigate("");
        setSignedIn(0);
    };

    return (
        <nav
            style={{
                borderBottom: "solid 1px #ccc",
                paddingBottom: "10px",
            }}
        >
            <div style={myStyle}>
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        color: isActive ? "red" : "",
                    })}
                >
                    Home
                </NavLink>

                {signedIn ? (
                    <NavLink
                        to="/dashboard"
                        style={({ isActive }) => ({
                            color: isActive ? "red" : "",
                        })}
                    >
                        Dashboard
                    </NavLink>
                ) : (
                    <NavLink
                        to="/signup"
                        style={({ isActive }) => ({
                            color: isActive ? "red" : "",
                        })}
                    >
                        Sign Up
                    </NavLink>
                )}

                <NavLink
                    to="/signin"
                    style={({ isActive }) => ({
                        color: isActive ? "red" : "",
                    })}
                >
                    Sign In
                </NavLink>

                {signedIn ? (
                    <Button
                        variant="contained"
                        style={{ justifySelf: "end", marginTop: "5px" }}
                        onClick={handleLogOut}
                    >
                        Logout
                    </Button>
                ) : (
                    ""
                )}
            </div>
        </nav>
    );
};

export default Navbar;
