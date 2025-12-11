import React, { useEffect } from "react";

import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Limiter from "../components/Limiter";
import { ClerkProvider } from "@clerk/nextjs";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return (
    <ClerkProvider>
      <Layout H1={1}>
        <Limiter>Loading......</Limiter>
      </Layout>
    </ClerkProvider>
  );
}
