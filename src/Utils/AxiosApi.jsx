import axios from "axios";
export const headersCors = {
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
};
export const BaseURL = "http://localhost:5000";

export const headers = () => {
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  if (!localStorage.getItem("loggedin")) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    };
  } else {
    return {
      Authorization: "Bearer " + LocalStorageData.access_token,
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    };
  }
};

const instance = axios.create({
  baseURL: "https://6bf9-2401-4900-1c46-d537-5df8-c676-a160-e552.in.ngrok.io",

  headers: headers(
    "Access-Control-Allow-Origin: *"
    // "Content-Type",
    // "Access-Control-Allow-Methods: GET"
  ),
  // headers: headers("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"),
  // headers: headers("Access-Control-Allow-Headers", "Content-Type"),
  // mode: "no-cors", // 'cors' by default
  params: {}, // do not remove this, its added to add params later in the config
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// instance.interceptors.response.use(undefined, (err) => {
//   if (err.response !== undefined) {
//     if (err.response.status === 401) {
//       localStorage.clear();
//       window.location.reload();
//     }
//   }
// });

export default instance;
