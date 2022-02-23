import getConfig from "next/config";
import { getSession } from "next-auth/client";

const { serverRuntimeConfig } = getConfig();

const BASE_URL = serverRuntimeConfig.DEV_URL;
export default async function handler(req, res) {
  const session = await getSession({ req });
  const requestOptions = {
    method: "GET",
    headers: { token: session.accessToken },
  };
  if (req.query.id) {
    const resData = await fetch(BASE_URL + "/" + req.query.id, requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result).data);

    res.status(200).json({ data: resData });
  } else {
    res.status(500).json({ error: "No data found" });
  }
}
