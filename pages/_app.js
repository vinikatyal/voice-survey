import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import { useRouter } from "next/router";

import "../styles/app.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/theme";
import { responsiveFontSizes } from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "../services/auth.service";
import { SurveyProvider } from "../context/SurveyState";

import { SessionProvider } from "next-auth/react";

const responsiveTheme = responsiveFontSizes(theme);

export default function MyApp(props) {
  const router = useRouter();
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={responsiveTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <SurveyProvider>
          <CssBaseline />
          <SessionProvider session={session}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </SessionProvider>
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

function Auth({ children }) {
  const router = useRouter();
  const { data: session, status, token } = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) router.push("/login"); //Redirect to login
  }, [isUser, status]);

  if (isUser) {
    return children;
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
