const FormData = require("form-data");

const BASE_URL = "http://172.16.22.5:8086";

export default async function handler(req, res) {
  const { id } = req.query;
  // need to figure this out
  const resData = await fetch(`${BASE_URL}/update_user_answer/${id}`, {
    method: "POST",
    body: new FormData(req.body),
  }).then((response) => response.json());

  if (resData.code === 200) {
    return res.status(resData.code).json(resData);
  } else {
    return res.status(resData.code).json({ error: "There was an error" });
  }
}
