import { Link } from "react-router-dom";

const myStyle = {
    display: "flex",
    justifyContent: "space-around",
    fontSize: "30px",
    textDecoration: "none",
};

const linkStyle = {
    textDecoration: "none",
};

const Navbar = () => {
    return (
        <nav
            style={{
                borderBottom: "solid 1px #ccc",
                paddingBottom: "10px",
            }}
        >
            <div style={myStyle}>
                <Link to="/" style={linkStyle}>
                    Home
                </Link>
                <Link to="/dashboard" style={linkStyle}>
                    Dashboard
                </Link>
                <Link to="/signup" style={linkStyle}>
                    Sign Up
                </Link>
                <Link to="/signin" style={linkStyle}>
                    Sign In
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
