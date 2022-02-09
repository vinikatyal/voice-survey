import React from "react";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import StyledButton from "./StyledButton";
import styled from "@emotion/styled";

import isEmpty from "lodash.isempty";

import { authService } from "../services/auth.service";

const LoginFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: "5px",
  marginTop: "5px",
}));

export default function InviteInput() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    return authService
      .send_invite(data)
      .then((res) => {
        // get return url from query parameters or default to '/'
        toast.success("Invite sent successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(res);
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <>
      <LoginFormLabel>Invite Team Member</LoginFormLabel>
      <TextField
        error={!isEmpty(errors.email)}
        required
        {...register("email", {
          required: {
            value: true,
            message: "Enter the email",
          },
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}/,
            message: "Invalid Email",
          },
        })}
        id="email"
        name="email"
        placeholder="contact@email.com"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <StyledButton onClick={handleSubmit(onSubmit)}>
                Send Invite
              </StyledButton>
            </InputAdornment>
          ),
        }}
      />
      {errors.invite_email && (
        <Typography color="red">{errors.invite_email.message}</Typography>
      )}
    </>
  );
}
