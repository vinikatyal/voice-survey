import getConfig from "next/config";

import get from "lodash.get";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { errorHandler } from "../helpers/api/error-handler";

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
  get_survey_details_link,
  edit_survey,
  delete_survey,
  get_surveys_count,
  generateLink,
  getAll,
  update_user_answer,
  getSurveyResults,
  getSurveyResponseCount,
  getQuestionLevelAnalytics,
  getSurveyLevelAnalytics,
  update_survey_media,
};

async function update_user_answer(uniqueId, data) {
  return await fetchWrapper
    .postFormDataWithoutHeader(
      `${baseUrl}/update_user_answer/${uniqueId}`,
      data
    )
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      return error;
    });
}

async function update_survey_media(uniqueId, data, mediaType) {
  return await fetchWrapper
    .postFormDataWithoutHeader(
      `${baseUrl}/update_survey_media/${uniqueId}?media_type=` + mediaType,
      data
    )
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      return error;
    });
}

// for external link
async function get_survey_details_link(id) {
  const res = await fetch(`/api/survey/${id}`);
  const surveyData = await res.json();
  if (res.ok) {
    return surveyData;
  } else {
    return {};
  }
}

async function create_survey(data) {
  const token = await getAccessToken();
  return await fetchWrapper
    .post(`${baseUrl}/create_survey`, data, { token })
    .then((res) => {
      if (get(res, "code.survey_id")) {
        return res;
      } else {
        errorHandler({}, res);
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
        errorHandler({}, res);
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
        errorHandler({}, res);
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
        errorHandler({}, res);
      }
    });
}

async function get_surveys_count(type) {
  const token = await getAccessToken();
  return fetchWrapper
    .get(`${baseUrl}/get_surveys_count/${type}`, {
      token,
    })
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        errorHandler({}, res);
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
        errorHandler({}, res);
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
        errorHandler({}, res);
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
        errorHandler({}, res);
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
        errorHandler({}, res);
      }
    });
}

async function generateLink(survey_id, survey_type, url) {
  const token = await getAccessToken();
  return await fetchWrapper
    .post(
      `${baseUrl}/genarate_survey_share_link/${survey_id}`,
      { url, survey_type },
      {
        token,
      }
    )
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

// Reporting

async function getSurveyLevelAnalytics(id, data) {
  const token = await getAccessToken();
  return await fetchWrapper
    .post(`${baseUrl}/get_survey_level_analytics/${id}`, data, {
      token,
    })
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

async function getQuestionLevelAnalytics(id, data) {
  const token = await getAccessToken();
  return await fetchWrapper
    .post(`${baseUrl}/get_ques_level_analytics/${id}`, data, {
      token,
    })
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

async function getSurveyResults(id, data) {
  const token = await getAccessToken();
  return await fetchWrapper
    .post(`${baseUrl}/get_survey_results/${id}`, data, {
      token,
    })
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

async function getSurveyResponseCount(id, data) {
  const token = await getAccessToken();
  return await fetchWrapper
    .post(`${baseUrl}/get_surveys_response_count/${id}`, data, {
      token,
    })
    .then((res) => {
      if (get(res, "code") === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
