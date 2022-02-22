import getConfig from "next/config";

import get from "lodash.get";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { getAccessToken } from "./auth.service";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const surveyService = {
  create_survey,
  get_survey_template_metadata,
  get_survey_template_data,
  get_all_surveys,
  get_my_surveys,
  get_shared_surveys,
  get_survey_details,
  edit_survey,
  delete_survey,
  getAll,
};

async function create_survey(data, token) {
  return await fetchWrapper
    .post(`${baseUrl}/create_survey`, data, { token })
    .then((res) => {
      if (get(res, "code.survey_id")) {
        return res;
      } else {
        return {};
      }
    });
}

async function get_all_surveys(page) {
  const token = await getAccessToken();
  return fetchWrapper
    .get(`${baseUrl}/get_all_surveys`, {
      token,
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

async function get_my_surveys(page) {
  const token = await getAccessToken();
  return fetchWrapper
    .get(`${baseUrl}/get_my_surveys`, {
      token,
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

async function get_shared_surveys(page) {
  const token = await getAccessToken();
  return fetchWrapper
    .get(`${baseUrl}/get_shared_surveys`, {
      token,
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

async function get_survey_template_metadata() {
  const token = await getAccessToken();
  return fetchWrapper
    .get(`${baseUrl}/get_survey_template_metadata`, {
      token,
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
  const token = await getAccessToken();
  return await fetchWrapper
    .post(`${baseUrl}/get_survey_template_data`, data, {
      token,
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
  const token = await getAccessToken();
  return await fetchWrapper
    .get(`${baseUrl}/get_survey_details/${id}`, {
      token,
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
  const token = await getAccessToken();
  return await fetchWrapper
    .post(`${baseUrl}/edit_survey/${id}`, data, {
      token,
    })
    .then((res) => {
      if (get(res, "code.survey_id")) {
        return res;
      } else {
        return {};
      }
    });
}

async function delete_survey(id) {
  const token = await getAccessToken();
  return await fetchWrapper
    .get(`${baseUrl}/delete_survey/${id}`, {
      token,
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
