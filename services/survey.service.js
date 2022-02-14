import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";

import { fetchWrapper } from "../helpers/fetch-wrapper";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const tokenSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("token"))
);

export const surveyService = {
  token: tokenSubject.asObservable(),
  get tokenValue() {
    return tokenSubject.value;
  },
  create_survey,
  get_survey_template_metadata,
  get_survey_template_data,
  getAll,
};

function create_survey(data) {
  const { survey_title, access_list_emails, survey_type } = data;
  console.log(tokenSubject);
  return fetchWrapper
    .post(
      `${baseUrl}/create_survey`,
      {
        survey_title,
        access_list_emails,
        survey_type,
      },
      { token: tokenSubject.value }
    )
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes

      if (res.code === 200) {
        return res;
      } else {
        return {};
      }
    });
}

function get_survey_template_metadata() {
  return fetchWrapper
    .get(`${baseUrl}/get_survey_template_metadata`, {
      token: tokenSubject.value,
    })
    .then((res) => {
      if (res.code === 200) {
        return res;
      } else {
        return {};
      }
    });
}

async function get_survey_template_data(data) {
  return await fetchWrapper
    .post(`${baseUrl}/get_survey_template_data`, data, {
      token: tokenSubject.value,
    })
    .then((res) => {
      if (res.code === 200) {
        return res;
      } else {
        return {};
      }
    });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
