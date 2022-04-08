import * as React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Header from "../Header";

import styled from "@emotion/styled";

const DBLoader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "700px",
});

const DashboardHeader = styled("div")(({ theme }) => ({
  display: "flex",
  height: "60px",
  padding: theme.spacing(2),
  backgroundColor: "#f5f8ff",
  marginTop: "30px",
}));

export default function DashboardLoader() {
  return (
    <>
      <Header>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <SkeletonTheme
            baseColor="#e6e8ed"
            highlightColor="#f7f7f7"
            width="120px"
            height="50px"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
          <DBLoader>
            <SkeletonTheme
              baseColor="#e6e8ed"
              highlightColor="#f7f7f7"
              width="120px"
              height="50px"
            >
              <Skeleton count={1} />
            </SkeletonTheme>
            <SkeletonTheme
              baseColor="#e6e8ed"
              highlightColor="#f7f7f7"
              width="120px"
              height="50px"
            >
              <Skeleton count={1} />
            </SkeletonTheme>
            <SkeletonTheme
              baseColor="#e6e8ed"
              highlightColor="#f7f7f7"
              width="120px"
              height="50px"
            >
              <Skeleton count={1} />
            </SkeletonTheme>
            <SkeletonTheme
              baseColor="#e6e8ed"
              highlightColor="#f7f7f7"
              width="170px"
              height="50px"
            >
              <Skeleton count={1} />
            </SkeletonTheme>
          </DBLoader>
        </Container>
      </Header>
      <Container maxWidth="lg">
        <DashboardHeader>
          <SkeletonTheme
            baseColor="#e6e8ed"
            highlightColor="#f7f7f7"
            width="120px"
            height="30px"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </DashboardHeader>
        <Grid container spacing={5} mt={2}>
          {Array.from(Array(9).keys()).map((_, index) => (
            <Grid key={index} item md={4}>
              <div>
                <SkeletonTheme
                  baseColor="#e6e8ed"
                  highlightColor="#f7f7f7"
                  width="100%"
                  height="130px"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
