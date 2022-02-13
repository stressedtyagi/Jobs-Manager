import { Backdrop, CircularProgress, Stack } from "@mui/material";

const Loader = (props) => {
    return (
        <Stack
            alignItems="center"
            // border="10px solid black"
            height="100vh"
            justifyContent="center"
        >
            <Backdrop open={true} sx={{ color: "#fff" }}>
                <CircularProgress size={80} {...props} />
            </Backdrop>
        </Stack>
    );
};

export default Loader;
