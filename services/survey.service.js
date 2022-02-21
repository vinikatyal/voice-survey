import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";

import get from "lodash.get";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { getFromStorage } from "./auth.service";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const tokenSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("token"))
);

export const surveyService = {
  create_survey,
  get_survey_template_metadata,
  get_survey_template_data,
  get_all_surveys,
  get_my_surveys,
  get_survey_details,
  edit_survey,
  getAll,
};

async function create_survey(data) {
  return await fetchWrapper
    .post(`${baseUrl}/create_survey`, data, { token: getFromStorage("token") })
    .then((res) => {
      if (get(res, "code.survey_id")) {
        return res;
      } else {
        return {};
      }
    });
}

function get_all_surveys(page) {
  return fetchWrapper
    .get(`${baseUrl}/get_all_surveys`, {
      token: getFromStorage("token"),
      pageno: page,
      max_records: 9,
    })
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        return {};
      }
    });
}

function get_my_surveys(page) {
  return fetchWrapper
    .get(`${baseUrl}/get_my_surveys`, {
      token: getFromStorage("token"),
      pageno: page,
      max_records: 9,
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
      token: getFromStorage("token"),
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
      token: getFromStorage("token"),
    })
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        return {};
      }
    });
}

async function get_survey_details(id) {
  return await fetchWrapper
    .get(`${baseUrl}/get_survey_details/${id}`, {
      token: getFromStorage("token"),
    })
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        return {};
      }
    });
}

async function edit_survey(id, data) {
  return await fetchWrapper
    .post(`${baseUrl}/edit_survey/${id}`, data, {
      token: getFromStorage("token"),
    })
    .then((res) => {
      if (get(res, "code.survey_id")) {
        return res;
      } else {
        return {};
      }
    });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
