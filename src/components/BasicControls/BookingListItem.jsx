import * as React from "react";

import { styled } from "@mui/material/styles";
import { Chip, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function BookingListItem({ type, children, onClick, icon }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText sx={{ paddingLeft: 3 }} primary={"Witthaus, Jörg"} />
        <Chip label="new" color="secondary" size="small" />
      </ListItemButton>
    </ListItem>
  );
}
