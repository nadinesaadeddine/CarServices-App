import ajax from "./Service";

export default {
  async saveCompany(bodyReq) {
    let endpoint;
    let company;

    if (bodyReq.company_id != null) endpoint = "/company/update";
    else endpoint = "/company/create";

    let promise = ajax
      .request(endpoint, bodyReq)
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          company = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return company;
  },

  async getCompanyByUser(user_id) {
    let company;
    let promise = ajax
      .request("/company/" + user_id + "/getCompanyByUser", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          company = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return company;
  },

  async getServicesByCompany(user_id, service_id) {
    let service;
    let promise = ajax
      .request(
        "/providerService/" +
          user_id +
          "/" +
          service_id +
          "/getServicesByCompany",
        null,
        "GET"
      )
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          service = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return service;
  },
};
