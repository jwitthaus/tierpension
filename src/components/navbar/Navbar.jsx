import React, { useCallback } from "react";

import Add from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import NavTabs from "./NavTabs";
import NewBookingDialog from "./NewBooking/NewBookingDialog";

const drawerWidth = 240;
const navItems = ["Bookings", "Calendar", "Billing"];

function Navbar(props) {
  const navigate = useNavigate();

  const [newBookingOpen, setNewBookingOpen] = React.useState(false);

  const handleNewBooking = () => {
    setNewBookingOpen(true);
  };

  const handleBookingClose = useCallback(() => {
    setNewBookingOpen(false);
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 1.5, mx: 2.5 }}>
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
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ width: "100%" }}>
        <Toolbar
          sx={{ width: "100%", display: "flex", justifyItems: "space-between" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Pet Hotel Manager
          </Typography>
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <NavTabs />
          </Box>

          <Button
            sx={{
              backgroundColor: "#fce2a6",
              borderRadius: "12px",
              width: "150px",
            }}
            type="oncontrast"
            startIcon={<Add />}
            onClick={handleNewBooking}
          >
            New Booking
          </Button>
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
