import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import styled from "@emotion/styled";

const Title = styled(DialogTitle)({
  height: "60px",
  display: "flex",
  justifyContent: "center",
  background: "linear-gradient(to left, #556df2, #3932be)",
  color: "#fff",
  fontWeight: "600",
  fontSize: "20px",
});

export default function ModalDialog({ title, isOpen, handleClose, children }) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Title>{title}</Title>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
