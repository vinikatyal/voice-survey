const FormData = require("form-data");

const BASE_URL = "http://172.16.22.5:8086";

export default async function handler(req, res) {
  const { id } = req.query;

  let form = new FormData();
  form.append("qid", req.body.qid);
  if (req.body.qtype === "audio") {
    form.append("answer_audio_file", req.body.answer_audio_file);
  } else {
    form.append("user_answer", req.body.user_answer);
  }
  form.append("qtype", req.body.qtype);

  const resData = await fetch(`${BASE_URL}/update_user_answer/${id}`, {
    method: "POST",
    body: form,
  }).then((response) => response.json());

  if (resData.code === 200) {
    return res.status(resData.code).json(resData);
  } else {
    return res.status(resData.code).json({ error: "There was an error" });
  }
}
