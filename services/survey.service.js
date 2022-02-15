import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";

import get from "lodash.get";

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
  get_all_surveys,
  get_my_surveys,
  getAll,
};

async function create_survey(data) {
  return await fetchWrapper
    .post(`${baseUrl}/create_survey`, data, { token: tokenSubject.value })
    .then((res) => {
      if (get(res, "code.survey_id")) {
        return res;
      } else {
        return {};
      }
    });
}

function get_all_surveys() {
  return fetchWrapper
    .get(`${baseUrl}/get_all_surveys`, {
      token: tokenSubject.value,
    })
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        return {};
      }
    });
}


function get_my_surveys() {
  return fetchWrapper
    .get(`${baseUrl}/get_my_surveys`, {
      token: tokenSubject.value,
    })
    .then((res) => {
      if (get(res, "code") === 200) {
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
      if (get(res, "code") === 200) {
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
      if (get(res, "code") === 200) {
        return res;
      } else {
        return {};
      }
    });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
