// other imports
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

// Custom Component Import
import Footer from "./Footer";
import Header from "./Header";

// helper/utils import
import browserActions from "../utils/browserActions";
import auth from "../utils/auth";

const Skeleton = () => {
    const [token, setToken] = useState(
        () => browserActions.getLocalStorage("token") || null
    );
    const [user, setUser] = useState(null);

    useEffect(() => {
        /**
         * Code to implement remember me functionality
         * If there is expiry key in localStoarage
         * then check if the difference between current time
         * and time when we last login is negative or not.
         * [-ve] : logout()
         * [+ve] : do nothing
         */
        const expiry = browserActions.getLocalStorage("expiry");
        if (
            expiry &&
            new Date().getHours() - new Date(expiry).getHours() <= 0
        ) {
            logout();
        }

        if (!user && token) {
            const params = {
                token: token,
            };
            auth.post("/api/v1/auth", params)
                .then((res) => {
                    const { userId, name } = res.data;
                    setUser({ userId, name });
                })
                .catch((err) => {
                    logout();
                });
        }
    });

    const login = (token) => {
        setToken(token);
    };
    const logout = () => {
        browserActions.removeLocalStorage("token");
        setToken(null);
        setUser(null);
    };

    return (
        <>
            <Header context={[user, login, logout]} />
            <Outlet context={[token, user, login, logout]} />
            <Footer />
        </>
    );
};

export default Skeleton;
