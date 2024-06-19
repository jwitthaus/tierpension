import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { ReactComponent as Cat } from "../../../images/noun-cat-6828443.svg";
import { ReactComponent as Dog } from "../../../images/noun-dog-6815406.svg";

export default function AnimalSelector() {
  const [alignment, setAlignment] = React.useState("both");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="cat">
        <Cat width="20px" />
      </ToggleButton>
      <ToggleButton value="dog">
        <Dog width="20px" />
      </ToggleButton>
      <ToggleButton value="both">
        <Cat width="20px" />
        <Dog width="20px" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
