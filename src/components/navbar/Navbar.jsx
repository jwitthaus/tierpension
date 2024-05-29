import * as React from "react";

import Add from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MyButton from "../BasicControls/MyButton";
import NewBookingDialog from "../Bookings/Toolbar/NewBookingDialog";
import NavTabs from "./NavTabs";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Bookings", "Calendar", "Billing"];

function Navbar(props) {
  const navigate = useNavigate();

  const [newBookingOpen, setNewBookingOpen] = React.useState(false);

  const handleNewBooking = () => {
    setNewBookingOpen(true);
  };

  const handleBookingClose = () => {
    setNewBookingOpen(false);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 1.5 }}>
        Pet Hotel Manager
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={(event) => navigate(item)}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "flex" }, flex: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "white",
                alignContent: "center",
              }}
            >
              Pet Hotel Manager
            </Typography>
            <NavTabs className={styles.tabs} />
            <MyButton
              className={styles.desktopbtn}
              type="oncontrast"
              icon={<Add />}
              onClick={handleNewBooking}
            >
              New Booking
            </MyButton>
            <IconButton className={styles.mobilebtn} aria-label="new booking">
              <Add />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <NewBookingDialog
        visible={newBookingOpen}
        callbackClose={handleBookingClose}
      />
    </Box>
  );
}

export default Navbar;
