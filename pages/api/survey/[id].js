import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const BASE_URL = serverRuntimeConfig.DEV_URL;
export default async function handler(req, res) {
  if (req.query.id) {
    const resData = await fetch(
      BASE_URL + "/get_survey_details_link/" + req.query.id
    ).then((response) => response.json());
    return res.status(200).json(resData);
  } else {
    return res.status(500).json({ error: "No data found" });
  }
}
