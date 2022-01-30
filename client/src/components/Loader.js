import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Loader = (props) => {
    return <CircularProgress size={80} {...props} />;
};

export default Loader;
