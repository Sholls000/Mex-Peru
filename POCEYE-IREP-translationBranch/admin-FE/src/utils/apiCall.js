import axios from "axios";
import { instanceOf } from "prop-types";
import Toastr from "./toastr";

export default async function apiCall(
  Url,
  Method = "GET",
  Data = null,
  timeoutOverride,
  silent,
  useCache = false,
  returnError = false
) {
  Method = Method || "GET";
  const cacheKey = Url.toLowerCase();
  if (useCache && Method.toUpperCase() === "GET") {
    const cachedResponse = sessionStorage.getItem(cacheKey);
    if (cachedResponse) return JSON.parse(cachedResponse);
  } else {
    sessionStorage.removeItem(cacheKey);
  }

  let baseUrl = process.env.REACT_APP_API;
  if (!baseUrl.endsWith("/")) {
    baseUrl = baseUrl + "/";
  }

  if (Url.startsWith("/")) {
    Url = Url.substring(1);
  }

  const new_request = {
    method: Method,
    url: baseUrl + Url,
    data: Data,
    timeout: timeoutOverride || process.env.REACT_APP_REQUEST_TIMEOUT,
  };

  let response = await axios(new_request);
  //  console.log("response", response);

  try {
    //  console.log({request: new_request, response});
  } catch (error) {}

  if (response) {
    if (!response.status || response.status === 0) {
      // if (!silent)
      Toastr(
        "error",
        "Sorry it seems you are not connected to internet. Please check you network connection and try again"
      );
      return null;
    }
    if (response.status === 401 || response.statusText === "Unauthorized") {
      const bypassAuth = process.env.REACT_APP_BYPASSAUTH === "true";
      if (!bypassAuth) {
        const email = localStorage.resu?.user?.Email;
        localStorage.clear();
        localStorage.lastLoggedInEmail = email;
        localStorage.fromUrl = document.location.href;
        window.location.href = `${process.env.REACT_APP_AUTH_LOGIN_URL}?redirect_url=${document.location.href}`;
      }
      if (returnError) return { ...response, error: true };
      return null;
    }
    if (response.status >= 400 && response.status < 500) {
      let message = "Your request generated an error. Please review and retry";
      if (response.data) {
        if (response.data.title) {
          message = `${response.data.title}. ${response.data.details ?? ""}`;
        } else {
          message = response.data;
        }
      }
      if (!silent) Toastr("warning", message);
      if (returnError) return { ...response, error: true };
      return null;
    }
    if (response.status >= 500) {
      let message =
        "Sorry your request cannot be processed at this moment please try again later";
      if (response.data) {
        if (response?.data?.toLowerCase()?.includes("duplicate entry")) {
          // message = "Duplicate entry. This record already exists.";
          // display a duplicate error message with the problem key. This is done this way because the backend sends back the DB message in this way.
          let errKey = response?.data
            ?.toLowerCase()
            ?.split("key '")[1]
            ?.split("_")[1]
            ? response?.data?.toLowerCase()?.split("key '")[1]?.split("_")[1]
            : "";
          errKey = errKey && errKey.substring(0, errKey.length - 1);
          message = `Duplicate entry. A record with this ${
            errKey ? errKey : "data"
          } already exists.`;
        } else {
          message = `${response.data.title}. ${response.data?.details}`;
        }
      }
      if (!silent) Toastr("error", message);
      if (returnError) return { ...response, error: true };
      return null;
    }
  } else {
    if (!silent) {
      Toastr(
        "error",
        "Your request generated an error. Please check your network connection"
      );
    }
  }

  if (useCache && Method.toUpperCase() == "GET" && response?.data) {
    sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
  }

  return !response
    ? null
    : response.data ||
      response.data === 0 ||
      response.data === "0" ||
      response.data === false
    ? response.data
    : { status: "success" };
}
