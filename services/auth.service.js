import getConfig from "next/config";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { errorHandler } from "../helpers/api/error-handler";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const authService = {
  signup,
  add_user_details,
  update_user_details,
  get_user_profile,
  get_team_members,
  get_user_logo,
  send_invite,
  forgot_password,
  reset_password,
  getAll,
};


function signup(email, password, mobile) {
  return fetchWrapper
    .post(`${baseUrl}/register_user`, { email, password, mobile })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes

      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      errorHandler(error, {});
    });
}

async function add_user_details(data) {
  return fetchWrapper
    .postFormData(`${baseUrl}/add_user_profile`, data, {
      token,
    })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      errorHandler(error, {});
    });
}

async function update_user_details(data) {
  return fetchWrapper
    .postFormData(`${baseUrl}/update_user_profile`, data, {
      token,
    })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      errorHandler(error, {});
    });
}

async function get_user_profile() {
  return await fetchWrapper
    .get(`${baseUrl}/get_user_profile`, { token })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      errorHandler(error, {});
    });
}

async function get_user_logo() {
  return fetchWrapper
    .get(`${baseUrl}/get_user_logo`, { token })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      errorHandler(error, {});
    });
}

async function send_invite(data) {
  return fetchWrapper
    .post(`${baseUrl}/send_invite`, data, { token })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes

      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      errorHandler(error, {});
    });
}

async function get_team_members() {
  return await fetchWrapper
    .get(`${baseUrl}/get_team_members`, { token })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes

      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      errorHandler(error, {});
    });
}

function forgot_password(email) {
  return fetchWrapper
    .post(`${baseUrl}/forgot_password`, { email })
    .then((res) => {
      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      errorHandler(error, {});
    });
}

async function reset_password(email, old_password, new_password) {
  return fetchWrapper
    .post(
      `${baseUrl}/reset_password`,
      { email, old_password, new_password },
      { token }
    )
    .then((res) => {
      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    })
    .catch((error) => {
      errorHandler(error, {});
    });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
