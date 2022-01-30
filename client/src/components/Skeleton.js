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
    /**
     * If there is token available in localStorage the use that token as
     * state value otherwise initialize it to 0
     *
     * TODO: Setting up random token value also let user to login
     */
    const [token, setToken] = useState(
        () => browserActions.getLocalStorage("token") || null
    );
    const [user, setUser] = useState(null);

    useEffect(() => {
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
