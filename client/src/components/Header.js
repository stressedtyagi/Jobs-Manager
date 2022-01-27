import { useEffect } from "react";
import Navbar from "./Navbar";

const Header = (props) => {
    const [signedIn] = props.context;
    /**
     * Debuging start
     */
    useEffect(() => {
        console.log("HEADER : " + signedIn);
    }, [signedIn]);
    /**
     * Debuging end
     */
    return (
        <>
            <Navbar {...props} />
        </>
    );
};

export default Header;
