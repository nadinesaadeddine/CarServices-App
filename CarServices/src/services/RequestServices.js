import ajax from "./Service";

export default {
  async getAllServices() {
    let services;
    let promise = ajax
      .request("/serviceSetup/getAllServices", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          services = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return services;
  },

  async getCompanyById(company_id) {
    let company;
    let promise = ajax
      .request("/company/" + company_id + "/getCompanyById", null, "GET")
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

  async createRequest(bodyReq) {
    let userService;
    let promise = ajax
      .request("/userService/create", bodyReq)
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          userService = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return userService;
  },

  async updateRequest(bodyReq) {
    let userService;
    let promise = ajax
      .request("/userService/update", bodyReq)
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          userService = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return userService;
  },

  async getNearProviderByService(service_id) {
    let providers;
    let promise = ajax
      .request(
        "/providerService/" + service_id + "/getNearProviderByService",
        null,
        "GET"
      )
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          providers = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return providers;
  },
  async getProvidersCompaniesByService(service_id) {
    let companies;
    let promise = ajax
      .request(
        "/providerService/" + service_id + "/getProvidersCompaniesByService",
        null,
        "GET"
      )
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          companies = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return companies;
  },

  async getServicesByUser(user_id) {
    let userServices;
    let promise = ajax
      .request("/userService/" + user_id + "/getServicesByUser", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          userServices = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return userServices;
  },

  async getServiceDoneByUser(user_id) {
    let userServices;
    let promise = ajax
      .request("/userService/" + user_id + "/getServiceDoneByUser", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          userServices = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return userServices;
  },

  async getServiceFinalByUser(user_id) {
    let userServices;
    let promise = ajax
      .request(
        "/userService/" + user_id + "/getServiceFinalByUser",
        null,
        "GET"
      )
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          userServices = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return userServices;
  },

  async getServicesByCompany(user_id) {
    let userServices;
    let promise = ajax
      .request("/userService/" + user_id + "/getServicesByCompany", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          userServices = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return userServices;
  },

  async getDefaultUserCar(user_id) {
    let car;
    let promise = ajax
      .request("/carProfile/" + user_id + "/getDefaultCarByUser", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          car = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return car;
  },

  async getServicesById(service_id) {
    let service;
    let promise = ajax
      .request("/userService/" + service_id + "/getServicesById", null, "GET")
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

  async addRating(bodyReq) {
    let rating;
    let promise = ajax
      .request("/rating/create", bodyReq)
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          rating = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return rating;
  },

  async getRatingByCompany(company_id) {
    let service;
    let promise = ajax
      .request("/rating/" + company_id + "/getRatingByCompany", null, "GET")
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

  async getPendingServicesByCar(car_id) {
    let userServices;
    let promise = ajax
      .request(
        "/userService/" + car_id + "/getPendingServicesByCar",
        null,
        "GET"
      )
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          userServices = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return userServices;
  },
};
