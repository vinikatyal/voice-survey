import React, { useEffect } from "react";

import isEmpty from "lodash.isempty";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import Image from "next/image";

// UI
import logo from "../../images/logo.png";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";

// Logo
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Components
import Layout from "../../components/Layout";
import Limiter from "../../components/Limiter";
import StyledButton from "../../components/StyledButton";
import AddLogo from "../../components/AddLogo";

import InviteInput from "../../components/InviteInput";

import { authService } from "../../services/auth.service";

const ImageContainer = styled(Box)({
  paddingTop: "30px",
  display: "flex",
  justifyContent: "center",
});
const DetailHeader = styled(Typography)({
  marginTop: "30px",
  padding: "19px 0",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f5f8ff",
  fontFamily: "Poppins",
  fontSize: "24px",
  fontWeight: "600",
});

const LogoHeading = styled(Typography)({
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "500",
});

const NextSection = styled("div")({
  display: " flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "30px",
});

const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: "5px",
  marginTop: "5px",
}));

const StyledAccordion = styled(Accordion)(() => ({
  boxShadow: "0 2px 6px 0 rgba(113, 125, 129, 0.16)",
  borderTop: "none",
  border: "solid 1px #dcdcdc",
  backgroundColor: "#fff",
  borderRadius: "5px",
}));

const MemberDetails = ({ img, email }) => (
  <React.Fragment>
    <Grid container mt={2}>
      <Grid item xs={8} display="flex" alignItems={"center"}>
        <Avatar alt="avatar" src={img} />
        <Typography ml={2}>{email}</Typography>
      </Grid>
      <Grid
        item
        xs={4}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Typography
          variant="subtitle2"
          color="#bfbfbf"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
        >
          Remove
        </Typography>
      </Grid>
    </Grid>
  </React.Fragment>
);

const MembersAccordion = (
  <React.Fragment>
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container width="100%" justifyContent="space-between">
          <Typography variant="h5">Members</Typography>
          <Typography variant="h5" color="#0a23fb">
            2
          </Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <MemberDetails
          img="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
          email="dhanush@gmail.com"
        />
        <MemberDetails
          img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
          email="shilpa@gmail.com"
        />
      </AccordionDetails>
    </StyledAccordion>
  </React.Fragment>
);

export default function Index() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // redirect to home if already logged in
    authService
      .get_user_profile()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setError("apiError", { message: error });
      });
  }, []);

  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data);
    router.push("/survey/create");
  };
  return (
    <Layout>
      <Limiter>
        <ImageContainer>
          <Image src={logo} alt="background" />
        </ImageContainer>
      </Limiter>

      <DetailHeader>Add Details</DetailHeader>

      <Limiter>
        <Grid
          id="logoInputSection"
          container
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          mt={3}
          mb={3}
        >
          <LogoHeading>Select any png.svg or jpg file</LogoHeading>
          <AddLogo />
        </Grid>

        <Grid id="formInputSection" container justifyContent="center">
          <FormControl sx={{ width: "660px" }}>
            <LoginFormLabel>Add Company Name</LoginFormLabel>
            <TextField
              error={!isEmpty(errors.company_name)}
              required
              {...register("company_name", {
                required: {
                  value: true,
                  message: "Company Name is required",
                },
              })}
              id="company_name"
              name="company_name"
              placeholder="Your Company Name"
            />
            {errors.company_name && (
              <Typography color="red">{errors.company_name.message}</Typography>
            )}
            <InviteInput />

            {MembersAccordion}
          </FormControl>
        </Grid>

        <NextSection>
          <StyledButton onClick={handleSubmit(onSubmit)}>Next</StyledButton>
        </NextSection>
      </Limiter>
    </Layout>
  );
}
