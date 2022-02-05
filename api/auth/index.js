import { VOICE_API_BASE_URL } from "../index";

export const loginUser = async (data) => {
  const response = await fetch(VOICE_API_BASE_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch(function (error) {
    // Error handling here!
  });

  return response;
};
