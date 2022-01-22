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
    h3: {
      fontSize: 24,
      fontWeight: 600,
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
    },
    button: {
      fontSize: 14,
      fontWeight: 400,
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: "#fff",
        color: "#707070",
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
