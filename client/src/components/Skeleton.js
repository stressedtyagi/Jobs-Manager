import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Skeleton = () => {
    return (
        <>
            <Header />
                <Outlet/>
            <Footer />
        </>
    );
}

export default Skeleton;