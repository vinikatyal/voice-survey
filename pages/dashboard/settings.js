import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import get from "lodash.get";

import { signOut } from "next-auth/react";

import { toast } from "react-toastify";

import router from "next/router";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import Button from "@mui/material/Button";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Limiter from "../../components/Limiter";
import AddLogo from "../../components/AddLogo";
import InviteInput from "../../components/InviteInput";
import StyledButton from "../../components/StyledButton";

// styles
import styled from "@emotion/styled";

import { authService } from "../../services/auth.service";

const FullBackground = styled(Container)(({ theme }) => ({
  height: "100vh",
}));

const LogoHeading = styled(Typography)({
  fontSize: "16px",
  fontWeight: "500",
});

const GridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#FD574F",
  },
}));

const TabBasic = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  width: "200px",
  "&.Mui-selected": {
    color: "#272846",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));
const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: "5px",
  marginTop: "5px",
}));

const NextSection = styled("div")({
  display: " flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "30px",
});

const Logout = styled(Button)(({ theme }) => ({
  borderRadius: "4px",
  minWidth: "160px",
  "&.MuiButtonBase-root:hover": {
    backgroundColor: "#dfe6f5",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Index() {
  const [value, setVal] = React.useState(0);
  const [existingDetails, setExistingDetails] = useState({});
  const [logoVal, setLogo] = useState();

  const {
    register,
    handleSubmit,
    setError,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // redirect to home if already logged in
    let isSubscribed = true;
    // declare the async data fetching function
    const fetchUserData = async () => {
      // get the data from the api
      const res = await authService.get_user_profile();
      // convert the data to json
      const json = await res.data;

      if (isSubscribed) {
        setExistingDetails(json);
        setValue("company", json.company, { shouldDirty: true });
      }
    };

    // call the function
    fetchUserData()
      // make sure to catch any error
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    return () => (isSubscribed = false);
  }, []);

  const updateLogo = (file) => {
    setLogo(file);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    if (logoVal) {
      formData.append("company_logo", logoVal);
    }
    formData.append("user_name", existingDetails.email);
    formData.append("company", data.company);
    return authService
      .update_user_details(formData)
      .then(() => {
        toast.success("Details updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const logOut = () => {
    signOut();
    router.push("/login");
  };

  const handleChange = (event, newValue) => {
    setVal(newValue);
  };

  return (
    <>
      <DashboardHeader />
      <FullBackground maxWidth="lg">
        <GridContainer container spacing={5}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
          >
            <TabBasic label="Basic details" />
            {/* <TabBasic label="Reset password" /> */}
            <TabBasic label="Account" />
          </StyledTabs>

          <TabPanel value={value} index={0}>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
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
                    logo={existingDetails.logo}
                    updateLogo={updateLogo}
                  />
                </Grid>

                <Grid id="formInputSection" container justifyContent="center">
                  <FormControl sx={{ width: "660px" }}>
                    <LoginFormLabel>Add Company Name</LoginFormLabel>
                    <TextField
                      required
                      {...register("company", {
                        required: true,
                        onChange: async (e) => {
                          await trigger("company");
                        },
                      })}
                      id="company"
                      name="company"
                      placeholder="Your Company Name"
                      setValue={existingDetails.company}
                    />
                    <InviteInput updateTeamMembers={() => {}} />
                  </FormControl>
                </Grid>

                <NextSection>
                  <StyledButton type="submit" onClick={handleSubmit(onSubmit)}>
                    Save
                  </StyledButton>
                </NextSection>
              </Limiter>
            </Box>
          </TabPanel>
          {/* <TabPanel value={value} index={1}></TabPanel> */}
          <TabPanel value={value} index={1}>
            <NextSection>
              <Logout
                variant="contained"
                color="secondary"
                type="submit"
                onClick={logOut}
                disableElevation
                disableRipple
              >
                Logout
              </Logout>
            </NextSection>
          </TabPanel>
        </GridContainer>
      </FullBackground>
    </>
  );
}
