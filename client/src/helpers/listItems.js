// mui imports
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material/ListItem";
import {
    DashboardIcon,
    ShoppingCartIcon,
    PeopleIcon,
    AssignmentIcon,
} from "@mui/icons-material/Dashboard";

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ShoppingCartIcon />
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

export const secondaryListItems = (
    <div>
        <ListSubheader inset>MORE CONTENT</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="RB 1" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="RB 2" />
        </ListItem>
    </div>
);
