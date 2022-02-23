import getConfig from "next/config";
import { getSession } from "next-auth/react";

const { serverRuntimeConfig } = getConfig();

const BASE_URL = serverRuntimeConfig.DEV_URL;
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.query.id && session) {
    const resData = await fetch(
      BASE_URL + "/get_survey_details/" + req.query.id
    ).then((response) => response.json());
    return res.status(200).json(resData);
  } else {
    return res.status(500).json({ error: "No data found" });
  }
}
