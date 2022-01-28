// other imports
import { useState } from "react";
import { Outlet } from "react-router";

// Custom Component Import
import Footer from "./Footer";
import Header from "./Header";

// helper/utils import
import browserActions from "../utils/browserActions";

const Skeleton = () => {
    /**
     * If there is token available in localStorage the use that token as
     * state value otherwise initialize it to 0
     *
     * TODO: Setting up random token value also let user to login
     */
    const [signedIn, setSignedIn] = useState(
        () => browserActions.getLocalStorage("token") || 0
    );

    return (
        <>
            <Header context={[signedIn, setSignedIn]} />
            <Outlet context={[signedIn, setSignedIn]} />
            <Footer />
        </>
    );
};

export default Skeleton;
