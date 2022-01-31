import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Loader = (props) => {
    return (
        <Stack
            alignItems="center"
            // border="10px solid black"
            height="100vh"
            justifyContent="center"
        >
            <CircularProgress size={80} {...props} />
        </Stack>
    );
};

export default Loader;
