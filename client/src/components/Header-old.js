// mui imports
import { Button, Chip } from "@mui/material";

//other imports
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

const Header = (props) => {
    const [user, login, logout] = props.context;
    const navigate = useNavigate();

    /**
     * [SETUP] : Put login button rather than link and make drop down form for signin
     */
    const handleLogOut = (event) => {
        event.preventDefault();

        logout();
        navigate("");
    };

    /**
     * [TODO] : UPDATE NAVBAR : Better Styling, Better Buttons
     */
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

                {user ? (
                    <>
                        <NavLink
                            to="/dashboard"
                            style={({ isActive }) => ({
                                color: isActive ? "red" : "",
                            })}
                        >
                            Dashboard
                        </NavLink>
                        <Chip label={`Hello ${user.name}`} variant="outlined" />
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

export default Header;
