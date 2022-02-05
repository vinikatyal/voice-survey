import React from "react";

// UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import AddLogo from "../AddLogo";
import ThemeItem from "../ThemeItem";

// themes images
import theme1 from "../../images/themes/theme1.png";
import theme2 from "../../images/themes/theme2.png";
import theme3 from "../../images/themes/theme3.png";

const Label = styled("span")({
  color: "#707070",
  fontSize: "16px",
  fontWeight: "500",
});

export default function SurveyThemeSection() {
  const themes = [
    {
      theme: theme1,
      themeName: "Theme Blue",
    },
    {
      theme: theme2,
      themeName: "Theme Pink",
    },
    {
      theme: theme3,
      themeName: "Theme Orange",
    },
  ];

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChangeSelectedValue = (themeName) => {
    selectedValue === themeName
      ? setSelectedValue("")
      : setSelectedValue(themeName);
  };

  return (
    <Container maxWidth="lg">
      <Grid mt={2} container direction="column">
        <Label>Select any png,svg or jpg file</Label>
        <AddLogo />
      </Grid>
      <Grid mt={2} container direction="column">
        <Label>Choose Theme</Label>
        <Grid container direction="row" justifyContent="space-between">
          {themes.map((item, index) => (
            <ThemeItem
              key={index}
              theme={item.theme}
              themeName={item.themeName}
              selectedValue={selectedValue}
              handleChange={handleChangeSelectedValue}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
