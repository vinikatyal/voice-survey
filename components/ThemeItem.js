import React from "react";
// ui
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";

import Image from "next/image";

export default function ThemeItem({ theme, selectedValue, handleChange }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => handleChange(theme)}>
        <Image src={theme.theme} alt="theme-1" />
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize={20} fontWeight={500} color="#00063e">
              {theme.themeName}
            </Typography>
            <Radio value={theme.id} checked={theme.id === selectedValue.id} />
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
