import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import { useRouter } from "next/router";

import "../styles/app.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "../services/auth.service";
import { SurveyProvider } from "../context/SurveyState";

export default function MyApp(props) {
  const router = useRouter();
  const { Component, pageProps } = props;
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [
      "/login",
      "/signup",
      "/dashboard",
      "/survey/create",
      "/survey/share",
      "/dashboard/my-surveys",
      "/details",
      "/survey/preview/1",
    ];
    const path = url.split("?")[0];
    if (!authService.tokenValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <SurveyProvider>
          <CssBaseline />
          {authorized && <Component {...pageProps} />}
          <ToastContainer />
        </SurveyProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
