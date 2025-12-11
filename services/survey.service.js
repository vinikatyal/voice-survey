import getConfig from "next/config";

import get from "lodash.get";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { errorHandler } from "../helpers/api/error-handler";


const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

const token = '637263bsnbd';

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

  // This is where we'll add a condition to return dummy data
  if (process.env.NODE_ENV === 'development') {
    // Return dummy survey data in development mode
    return Promise.resolve({
      code: 200,
      surveys: [
        {
          id: "survey1",
          title: "Customer Satisfaction Survey",
          questions: ["How satisfied are you with our service?", "Would you recommend us to others?"]
        },
        {
          id: "survey2",
          title: "Product Feedback Survey",
          questions: ["How would you rate our product?", "What improvements would you like to see?"]
        }
      ],
      pagination: {
        current_page: page,
        total_pages: 1,
        total_records: 2
      }
    });
  }

  // Original fetch logic
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
