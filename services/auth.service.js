import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { errorHandler } from "../helpers/api/error-handler";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const tokenSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("token"))
);

export const authService = {
  token: tokenSubject.asObservable(),
  get tokenValue() {
    return tokenSubject.value;
  },
  login,
  signup,
  add_user_details,
  get_user_profile,
  get_team_members,
  send_invite,
  logout,
  getAll,
};

function login(email, password) {
  return fetchWrapper
    .post(`${baseUrl}/login`, { email, password })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes

      if (res.code === 200) {
        tokenSubject.next(res);
        localStorage.setItem("token", JSON.stringify(res.data.token));

        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

function signup(email, password, mobile) {
  return fetchWrapper
    .post(`${baseUrl}/register_user`, { email, password, mobile })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes

      if (res.code === 200) {
        tokenSubject.next(res);
        localStorage.setItem("token", JSON.stringify(res.data.token));

        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

function add_user_details(data) {
  return fetchWrapper
    .post(
      `${baseUrl}/added_user_profile`,
      data,
      {
        token: tokenSubject.value,
      },
      true
    )
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

function get_user_profile() {
  return fetchWrapper
    .get(`${baseUrl}/get_user_profile`, { token: tokenSubject.value })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

function send_invite(data) {
  return fetchWrapper
    .post(`${baseUrl}/send_invite`, data, { token: tokenSubject.value })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes

      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

function get_team_members() {
  console.log(tokenSubject.value);
  return fetchWrapper
    .get(`${baseUrl}/get_team_members`, { token: tokenSubject.value })
    .then((res) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes

      if (res.code === 200) {
        return res;
      } else {
        errorHandler({}, res);
      }
    });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("token");
  tokenSubject.next(null);
  Router.push("/login");
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
