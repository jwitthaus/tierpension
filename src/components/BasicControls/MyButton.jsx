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
          color: "#ffffff",
          backgroundColor: "#243380",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          "&:hover": {
            backgroundColor: "#4B5DBB",
          },
        },
        secondary: {
          color: "#243380",
          backgroundColor: "#ffffff",
          borderColor: "#243380",
          "&:hover": {
            borderColor: "#243380",
            backgroundColor: "#EBF6FF",
          },
        },
        oncontrast: {
          color: "#243380",
          backgroundColor: "#FCE2A6",
          borderColor: "#243380",
          "&:hover": {
            borderColor: "#243380",
            backgroundColor: "#EBF6FF",
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
    props.type === "oncontrast" && styles.oncontrast,
  ],
})(({ theme }) => ({
  backgroundColor: "aliceblue",
  borderRadius: "12px",
  height: "48px",
  padding: "16px",
}));

export default function MyButton({ type, children, onClick, icon }) {
  return (
    <ThemeProvider theme={customTheme}>
      <Button
        onClick={onClick}
        startIcon={icon}
        type={type}
        variant={
          type === "primary" || type === "oncontrast"
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
