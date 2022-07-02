import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const BASE_URL = serverRuntimeConfig.server.DEV_URL;

export default async function handler(req, res) {
  const { id } = req.query;
  const resData = await fetch(`${BASE_URL}/get_survey_details_link/${id}`).then(
    (response) => response.json()
  );

  if (resData.code && resData.code === 200) {
    return res.status(200).json(resData);
  } else {
    return res.status(500).json({ error: "There was an error" });
  }
}
