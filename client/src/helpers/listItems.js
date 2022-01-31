// mui imports
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PeopleIcon from "@mui/icons-material/People";

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="View All Jobs" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Create Job" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Update Job" />
        </ListItem>
    </div>
);
