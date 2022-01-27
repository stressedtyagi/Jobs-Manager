import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Skeleton = () => {
    const [signedIn, setSignedIn] = useState(0);

    /**
     * TODO: Setting up random token value also let user to login
     * [NEW USE EFFECT HOOK UPLIFTED FROM SIGNIN state to parent here] - BUT WHY I DID THIS :) ? IDK
     */
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            // setSignin(1);
            console.log("SIGNIN COMP : " + signedIn);
            setSignedIn(1);
        }
        console.log("SKELETON : " + signedIn);
    }, [signedIn]);

    return (
        <>
            <Header context={[signedIn, setSignedIn]} />
            <Outlet context={[signedIn, setSignedIn]} />
            <Footer />
        </>
    );
};

export default Skeleton;
