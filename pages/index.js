import React, { useEffect } from "react";

import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Limiter from "../components/Limiter";

import { useAuth } from "@clerk/nextjs";

export default function Index() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {

    if (auth.isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
   
  }, []);
  return (
    <Layout H1={1}>
      <Limiter>Loading......</Limiter>
    </Layout>
  );
}
