import { Link, Typography } from "@mui/material";

function Copyright(props) {
    return (
        <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link
                color="inherit"
                href="https://github.com/stressedtyagi"
                target="_blank"
            >
                Divyanshu Tyagi
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default Copyright;
