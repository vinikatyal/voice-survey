const FormData = require("form-data");

const BASE_URL = "https://surveycallback.gnani.site";

export default async function handler(req, res) {
  const { id } = req.query;
  // need to figure this out
  console.log(req.body);
  const resData = await fetch(`${BASE_URL}/update_user_answer/${id}`, {
    method: "POST",
    body: new FormData(req.body),
  }).then((response) => response.json());

  console.log(resData);

  if (resData.code === 200) {
    return res.status(resData.code).json(resData);
  } else {
    return res.status(resData.code).json({ error: "There was an error" });
  }
}
