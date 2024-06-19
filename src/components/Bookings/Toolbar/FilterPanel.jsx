import { CloseOutlined } from "@mui/icons-material";
import {
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import AnimalSelector from "./AnimalSelector";

const FilterPanel = ({ visible, callbackClose }) => {
  return (
    <React.Fragment>
      <Drawer
        sx={{ p: 2 }}
        anchor="left"
        open={visible}
        onClose={callbackClose}
      >
        <Stack spacing={2} sx={{ mx: 2, my: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" sx={{ flex: 1 }}>
              Filters
            </Typography>
            <IconButton onClick={callbackClose}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <AnimalSelector />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="other"
            />
          </RadioGroup>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};

export default FilterPanel;
