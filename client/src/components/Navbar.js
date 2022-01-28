// mui imports
import { Button } from "@mui/material";

//other imports
import { NavLink, useNavigate } from "react-router-dom";

// helpers/utils imports
import { removeLocalStorage } from "../utils/browserActions";

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

    const handleLogOut = (event) => {
        removeLocalStorage("token");
        setSignedIn(0);
        navigate("");
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
                    <>
                        <NavLink
                            to="/dashboard"
                            style={({ isActive }) => ({
                                color: isActive ? "red" : "",
                            })}
                        >
                            Dashboard
                        </NavLink>
                        <Button
                            variant="contained"
                            style={{ justifySelf: "end", marginTop: "5px" }}
                            onClick={handleLogOut}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/signup"
                            style={({ isActive }) => ({
                                color: isActive ? "red" : "",
                            })}
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            to="/signin"
                            style={({ isActive }) => ({
                                color: isActive ? "red" : "",
                            })}
                        >
                            Sign In
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
