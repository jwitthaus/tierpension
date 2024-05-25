import { Box } from "@mui/material";
import React from "react";

const Test = () => {
  return (
    <Box
      width="100%"
      height="800px"
      display="grid"
      gridTemplateColumns="260px auto"
      gridTemplateRows="100px auto 100px"
      gridAutoRows="150px"
      gap="5px"
    >
      <Box gridColumn="1 / 2" gridRow="1 / 2" bgcolor="gray" />
      <Box gridColumn="2 / 3" gridRow="1 / 2" bgcolor="gray" />

      <Box gridColumn="1 / 2" gridRow="2 / 3" bgcolor="gray" />
      <Box gridColumn="2 / 3" gridRow="2 / 3" bgcolor="gray" />

      <Box gridColumn="1 / 2" gridRow="3 / 4" bgcolor="gray" />
      <Box gridColumn="2 / 3" gridRow="3 / 4" bgcolor="gray" />
    </Box>
  );
};

export default Test;
