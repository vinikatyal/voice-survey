import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  root: {
    "& .MuiFormLabel-root": {
      color: "#707070",
      fontSize: 16,
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#556df2",
      light: "#3932be",
    },
    secondary: {
      main: "#fd794e",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontSize: 14,
    h4: {
      fontSize: 21,
      fontWeight: 600,
    },
    h5: {
      fontSize: 18,
      fontWeight: 600,
    },
    h3: {
      fontSize: 24,
      fontWeight: 600,
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
    },
    button: {
      fontSize: 12,
      fontWeight: 500,
    },
    body2: {
      fontSize: 14,
      color: "#707070",
      textAlign: "justify",
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
  },
  props: {
    MuiAppBar: {
      color: "inherit",
    },
  },
});

export default theme;
