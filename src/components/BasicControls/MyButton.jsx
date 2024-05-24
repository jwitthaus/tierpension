import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

import { styled } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    Button: {
      styleOverrides: {
        root: {
          color: "darkslategray",
        },
        primary: {
          color: "#000000",
          backgroundColor: "#C9FA76",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          "&:hover": {
            backgroundColor: "#C1EF72",
          },
        },
        secondary: {
          color: "#000000",
          backgroundColor: "white",
          borderColor: "#D4D6CF",
          "&:hover": {
            borderColor: "#D4D6CF",
          },
        },
      },
    },
  },
});

const Button = styled(MuiButton, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "type",
  name: "Button",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.type === "primary" && styles.primary,
    props.type === "secondary" && styles.secondary,
  ],
})(({ theme }) => ({
  backgroundColor: "aliceblue",
  padding: theme.spacing(1),
  borderRadius: "12px",
  height: "48px",
  padding: "16px",
}));

export default function MyButtonSimpleOverride({
  type,
  children,
  onClick,
  icon,
}) {
  return (
    <ThemeProvider theme={customTheme}>
      <Button
        onClick={onClick}
        startIcon={icon}
        type={type}
        variant={
          type === "primary"
            ? "contained"
            : type === "secondary"
            ? "outlined"
            : null
        }
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}
