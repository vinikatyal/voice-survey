import React, { useEffect } from "react";

import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Button } from "@mui/material";
import Limiter from "../components/Limiter";
import Link from "next/link";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return (
    <Layout H1={1}>
      <Limiter>
        <Link href="/login" passHref>
          <Button variant="contained">Take me to Login Page</Button>
        </Link>
      </Limiter>
    </Layout>
  );
}
