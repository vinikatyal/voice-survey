
const BASE_URL = "http://172.16.22.5:8086";

export default async function handler(req, res) {
  const { id } = req.query;
  console.log(id)
  console.log(req.body)
  const resData = await fetch(`${BASE_URL}/update_user_answer/${id}`, {
    method: "POST",
    body: req.body,
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => response.json());

  console.log(resData)

  if (resData) {
    return res.status(resData.code).json(resData);
  } else {
    return res.status(500).json({ error: "No data found" });
  }
}
