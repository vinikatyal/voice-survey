import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import styled from "@emotion/styled";

const SuccessButton = styled(Button)(() => ({
  backgroundColor: "#19B885",
  "&:hover": {
    background: "#19B885",
  },
}));

export default function ConfirmationDialog({
  status,
  title,
  message,
  handleReject,
  handleAccept,
}) {
  return (
    <Dialog
      open={status}
      onClose={() => handleReject()}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="medium" onClick={() => handleReject()}>
          No
        </Button>
        <SuccessButton
          size="medium"
          variant="contained"
          disableElevation
          disableRipple
          onClick={() => handleAccept()}
        >
          Yes, Delete
        </SuccessButton>
      </DialogActions>
    </Dialog>
  );
}
