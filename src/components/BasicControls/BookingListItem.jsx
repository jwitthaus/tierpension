import * as React from "react";

import { ReactComponent as Cat } from "../../images/noun-cat-6828443.svg";
import { ReactComponent as Dog } from "../../images/noun-dog-6815406.svg";
import MedicationIcon from "@mui/icons-material/Medication";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import {
  Box,
  Chip,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function BookingListItem({
  newItem,
  label,
  animal,
  medication,
  intolerance,
  children,
  onClick,
}) {
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItemText primary={label} />
          {newItem && (
            <Chip
              label="new"
              color="secondary"
              size="small"
              sx={{ marginX: "8px" }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "right",
            alignContent: "center",
          }}
        >
          {animal === "cat" ? (
            <Cat width="24px" />
          ) : animal === "dog" ? (
            <Dog width="24px" />
          ) : null}
          {medication && <MedicationIcon />}
          {intolerance && <NoMealsIcon />}
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
