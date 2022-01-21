import * as React from "react";

import Box from "@mui/material/Box";
import styled from "@emotion/styled";

const FullBackground = styled(Box)(({ theme }) => ({
  height: "100vh",
  backgroundColor: "#f7fafc",
}));
export default function Index() {
  return <FullBackground></FullBackground>;
}
