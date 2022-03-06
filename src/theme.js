import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#556df2",
      light: "#3932be",
    },
    secondary: {
      main: "#dfe6f5",
      contrastText: "#707070",
    },
    success: {
      main: "#56b764",
    },
    error: {
      main: "#EE5752",
    },
    warning: {
      main: "#F7A237",
    },
  },
  typography: {
    fontFamily:
      '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"!important',
    fontSize: 14,
    h2: {
      fontSize: 28,
      fontWeight: 600,
      color: "#00063e",
    },
    h4: {
      fontSize: 21,
      fontWeight: 600,
      color: "#00063e",
    },
    h5: {
      fontSize: 18,
      fontWeight: 600,
      color: "#00063e",
    },
    h3: {
      fontSize: 24,
      fontWeight: 600,
      color: "#00063e",
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
      color: "#00063e",
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
      textTransform: "none",
    },
    body1: {
      fontSize: 16,
      color: "#707070",
    },
    body2: {
      fontSize: 14,
      color: "#707070",
      textAlign: "justify",
    },
    label: {
      color: "#707070",
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: "#fff",
        color: "#707070",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
      },
    },
    MuiFormLabel: {
      root: {
        color: "#707070",
        fontSize: 16,
      },
    },
  },
  props: {
    MuiAppBar: {
      color: "inherit",
    },
  },
});

export default theme;
