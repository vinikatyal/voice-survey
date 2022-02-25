const BASE_URL = "http://172.16.22.5:8086";
export default async function handler(req, res) {
  const { id } = req.query;
  const resData = await fetch(`${BASE_URL}/get_survey_details_link/${id}`).then(
    (response) => response.json()
  );
  return res.status(200).json(resData);
}
