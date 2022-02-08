import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers/fetch-wrapper";

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
        return {};
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
        return {};
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
