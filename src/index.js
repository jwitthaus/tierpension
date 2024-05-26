import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#243380",
    },
    secondary: {
      main: "#C9FA76",
    },
    tertiary: {
      main: "#ffffff",
    },
    border: {
      main: "#D4D6CF",
    },
    text: {
      onContrast: "#ffffff",
      standard: "#415050",
    },
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.15)",
    "0px 2px 4px rgba(0, 0, 0, 0.15)",
    "0px 4px 6px rgba(0, 0, 0, 0.15)",
    "0px 6px 8px rgba(0, 0, 0, 0.15)",
    ...Array(20).fill("none"),
  ],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
