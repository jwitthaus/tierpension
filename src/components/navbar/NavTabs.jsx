import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledTab = styled(Tab)({
  color: "#C5E0F9",
  "&.Mui-selected": {
    color: "white",
  },
  borderRadius: "12px",
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NavTabs() {
  const navigate = useNavigate();
  const [data] = useState(["Bookings", "Calendar", "Billing"]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue, label) => {
    setValue(newValue);
    navigate(data[newValue]);
  };

  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            sx: {
              bottom: 5,
              backgroundColor: "white",
            },
          }}
        >
          {data.map((d, i) => (
            <StyledTab key={i} label={d} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
