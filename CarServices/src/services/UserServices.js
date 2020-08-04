import config from "../../config/config";
//import ajax from "./Service";

const URI = config.URI;
export default {
  async register(role, firstName, lastName, email, password) {
    let user;
    let bodyReq = {
      role: role,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    let promise = fetch(URI + "/api/create", {
      method: "POST",
      body: JSON.stringify(bodyReq),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error(data.message);
        }
        user = data.data;
      })
      .catch((error) => console.log("Error: " + error));
    await promise;
    return user;
  },

  async login(email, password) {
    let user;
    let bodyReq = {
      email: email,
      password: password,
    };
    let promise = fetch(URI + "/api/login", {
      method: "POST",
      body: JSON.stringify(bodyReq),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error(data.message);
        }
        user = data.data;
      })
      .catch((error) => console.log("Error: " + error));
    await promise;
    return user;
  },

  async updateUser(bodyReq) {
    let user;
    let promise = fetch(URI + "/api/update", {
      method: "POST",
      body: JSON.stringify(bodyReq),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error(data.message);
        }
        user = data.data;
      })
      .catch((error) => console.log("Error: " + error));
    await promise;
    return user;
  },

  async getUser(user_id) {
    let user;

    let promise = fetch(URI + "/api/user/" + user_id + "/getUser", {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error(data.message);
        }
        user = data.data;
      })
      .catch((error) => console.log("Error: " + error));
    await promise;
    return user;
  },
};
