import React, { useEffect } from "react";

import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Limiter from "../components/Limiter";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return (
    <Layout H1={1}>
      <Limiter>Loading......</Limiter>
    </Layout>
  );
}
