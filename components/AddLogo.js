import React, { useEffect } from "react";

import { toast } from "react-toastify";

// UI
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import styled from "@emotion/styled";
import Image from "next/image";

const LogoInputSection = styled(Box)(({ error }) => ({
  width: "140px",
  height: "140px",
  margin: "10px 0",
  borderRadius: "8px",
  border: `dotted 2px ${error ? "red" : "#0a23fb"}`,
  backgroundColor: "#f5f8ff",
  display: "flex ",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "5px",
}));

const LogoAddButton = styled(Fab)({
  height: "10px",
  width: "36px",
});

const Input = styled("input")({
  display: "none",
});

const StyledTypography = styled(Typography)({
  textDecoration: "underline",
  cursor: "pointer",
  transform: "scale(1)",
  transition: "0.2s ease",
  "&:active": {
    transform: "scale(0.95)",
  },
});

export default function AddLogo({ logo, updateLogo, error }) {
  const addLogoRef = React.useRef();
  const logoInp = React.useRef();
  const [imageSrc, setImageSrc] = React.useState("");

  useEffect(() => {
    if (logo && typeof logo === "object") {
      const reader = new FileReader();
      reader.onload = async () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(logo);
    } else if (logo) {
      addLogoRef.current.style.display = "none";
      setImageSrc(logo);
    }
  }, [logo]);

  const handleInputChange = (event) => {
    const reader = new FileReader();
    reader.onload = async () => {
      addLogoRef.current.style.display = "none";
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    updateLogo(event.target.files[0]);
  };

  const changeLogo = () => {
    logoInp.current.click();
  };
  const removeLogo = () => {
    addLogoRef.current.style.display = "flex";
    setImageSrc("");
    updateLogo(null);
  };

  return (
    <>
      <LogoInputSection error={error}>
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
          ref={addLogoRef}
        >
          <label htmlFor="contained-button-file">
            <Input
              ref={logoInp}
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={handleInputChange}
            />
            <LogoAddButton color="primary" variant="contained" component="span">
              <Typography fontSize={28} color={"white"}>
                +
              </Typography>
            </LogoAddButton>
          </label>
          <Typography fontSize={18} color={"#0a23fb"}>
            Add Logo
          </Typography>
        </Grid>
        {imageSrc && (
          <Grid container>
            <Image
              height={140}
              width={140}
              src={imageSrc}
              unoptimized={false}
            />
          </Grid>
        )}
      </LogoInputSection>
      {error && <Typography color="red">You need to add logo</Typography>}
      {imageSrc && (
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <StyledTypography
              onClick={changeLogo}
              variant="subtitle2"
              color="#0a23fb"
            >
              Change Logo
            </StyledTypography>
          </Grid>
          <Grid item>
            <StyledTypography
              onClick={removeLogo}
              variant="subtitle2"
              color="#fd574f"
            >
              Remove Logo
            </StyledTypography>
          </Grid>
        </Grid>
      )}
    </>
  );
}
