import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const BASE_URL = serverRuntimeConfig.DEV_URL;
export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "POST") {
    const resData = await fetch(
      `http://172.16.22.5:8086/update_user_answer/${id}`,
      {
        method: "POST",
        body: req.body,
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((response) => response.json());
    return res.status(resData.code).json(resData);
  }
  if (req.method === "GET") {
    const resData = await fetch(
      "http://172.16.22.5:8086/get_survey_details_link/" + id
    ).then((response) => response.json());
    return res.status(200).json(resData);
  }
  return res.status(500).json({ error: "No data found" });
}
