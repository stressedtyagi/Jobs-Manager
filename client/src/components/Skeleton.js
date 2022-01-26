import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Skeleton = () => {
    const [signedIn, setSignedIn] = useState(0);

    /**
     * Debuging start
     */
    useEffect(() => {
        console.log("SKELETON : " + signedIn);
    }, [signedIn]);
    /**
     * Debuging end
     */

    return (
        <>
            <Header context={[signedIn, setSignedIn]} />
            <Outlet context={[signedIn, setSignedIn]} />
            <Footer />
        </>
    );
};

export default Skeleton;
