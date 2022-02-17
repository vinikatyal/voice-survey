import React, { useEffect, useState } from "react";

import isEmpty from "lodash.isempty";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import Image from "next/image";

// UI
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
        {/* <Avatar alt="avatar" src={img} /> */}
        <Typography ml={2}>{email}</Typography>
      </Grid>
      <Grid
        item
        xs={4}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        {/* <Typography
          variant="subtitle2"
          color="#bfbfbf"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
        >
          Remove
        </Typography> */}
      </Grid>
    </Grid>
  </React.Fragment>
);

export default function Index() {
  const router = useRouter();
  const [logoError, setLogoError] = useState(false);
  const [members, setTeamMembers] = useState([]);

  const [details, setDetails] = useState({
    company: "",
    logo: null,
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("company", details.company, {
      shouldDirty: true,
    });
  }, [details]);

  useEffect(async () => {
    try {
      const profile = await authService.get_user_profile();
      setDetails({ ...details, ...profile.data });
      await getTeamMembers();
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);
  const getTeamMembers = async () => {
    try {
      const members = await authService.get_team_members();
      setTeamMembers(members.data);
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const updateLogo = (file) => {
    file ? setLogoError(false) : setLogoError(true);
    setDetails({ ...details, logo: file });
  };

  const handleCompanyInput = (e) => {
    setDetails({ ...details, company: e.target.value });
  };

  const onSubmit = () => {
    if (!details.logo) {
      setLogoError(true);
      return;
    }
    let formData = new FormData();
    formData.append("company_logo", details.logo);
    formData.append("user_name", "vini");
    formData.append("company", details.company);
    return authService
      .add_user_details(formData)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <Layout>
      <Limiter>
        <ImageContainer>
          <Image src={"/images/logo.png"} alt="background" />
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
          <AddLogo
            logo={details.logo}
            error={logoError}
            updateLogo={updateLogo}
          />
        </Grid>

        <Grid id="formInputSection" container justifyContent="center">
          <FormControl sx={{ width: "660px" }}>
            <LoginFormLabel>Add Company Name</LoginFormLabel>
            <TextField
              error={!isEmpty(errors.company)}
              required
              {...register("company", {
                required: "You must specify company name",
                onChange: async (e) => {
                  await trigger("company");
                },
              })}
              onInput={handleCompanyInput}
              id="company"
              name="company"
              placeholder="Your Company Name"
            />
            {errors.company && (
              <Typography color="red">{errors.company.message}</Typography>
            )}
            <InviteInput updateTeamMembers={getTeamMembers} />

            {members && (
              <StyledAccordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container width="100%" justifyContent="space-between">
                    <Typography variant="h5">Members</Typography>
                    <Typography variant="h5" color="#0a23fb">
                      {members.length}
                    </Typography>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  {members.map((member, index) => (
                    <MemberDetails
                      key={index}
                      img="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
                      email={member}
                    />
                  ))}
                </AccordionDetails>
              </StyledAccordion>
            )}
          </FormControl>
        </Grid>

        <NextSection>
          <StyledButton type="submit" onClick={handleSubmit(onSubmit)}>
            Next
          </StyledButton>
        </NextSection>
      </Limiter>
    </Layout>
  );
}
