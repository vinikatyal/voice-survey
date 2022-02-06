import React from "react";

import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import StyledButton from "./StyledButton";
import styled from "@emotion/styled";

import isEmpty from "lodash.isempty";
import { useForm } from "react-hook-form";

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
    alert(JSON.stringify(data));
  };
  return (
    <>
      <LoginFormLabel>Invite Team Member</LoginFormLabel>
      <TextField
        error={!isEmpty(errors.invite_email)}
        required
        {...register("invite_email", {
          required: {
            value: true,
            message: "Enter the email",
          },
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}/,
            message: "Invalid Email",
          },
        })}
        id="invite_email"
        name="invite_email"
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
