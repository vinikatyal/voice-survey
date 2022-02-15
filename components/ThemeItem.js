import React from "react";
// ui
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";

import Image from "next/image";

export default function ThemeItem({
  id,
  theme,
  themeName,
  selectedValue,
  handleChange,
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => handleChange(id)}>
        <Image src={theme} alt="theme-1" />
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize={20} fontWeight={500} color="#00063e">
              {themeName}
            </Typography>
            <Radio value={id} checked={id === selectedValue} />
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
