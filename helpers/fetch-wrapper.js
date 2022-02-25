import getConfig from "next/config";

import { authService } from "../services/auth.service";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  put,
  postFormData,
  postFormDataWithoutHeader,
  delete: _delete,
};

function get(url, extraHeaders = {}) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(url), ...extraHeaders },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body, extraHeaders = {}) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(url),
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postFormData(url, body, extraHeaders = {}) {
  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(url),
      ...extraHeaders,
    },
    body: body,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postFormDataWithoutHeader(url, body, extraHeaders = {}) {
  const requestOptions = {
    method: "POST",
    headers: {
      ...extraHeaders,
    },
    body: body,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body, extraHeaders = {}) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(url),
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = authService.userValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
