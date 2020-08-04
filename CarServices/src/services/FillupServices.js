import ajax from "./Service";

export default {
  async createFillUp(bodyReq) {
    let fillup;
    let promise = ajax
      .request("/fillup/create", bodyReq)
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          fillup = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return fillup;
  },

  async updateFillUp(bodyReq) {
    let fillup;
    let promise = ajax
      .request("/fillup/update", bodyReq)
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          fillup = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return fillup;
  },

  async deleteFillUp(fill_id) {
    let fillup;
    let promise = ajax
      .request("/fillup/" + fill_id + "/destroy", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          fillup = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return fillup;
  },

  async getFillupByCar(car_id) {
    let fillups;
    let promise = ajax
      .request("/fillup/" + car_id + "/getFillupByCar", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          fillups = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return fillups;
  },
  async getFillupLastThirtyDaysByCar(car_id) {
    let fillups;
    let promise = ajax
      .request(
        "/fillup/" + car_id + "/getFillupLastThirtyDaysByCar",
        null,
        "GET"
      )
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          fillups = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return fillups;
  },
  async getSumFuelLastThirtyDays(car_id) {
    let totalCost;
    let promise = ajax
      .request("/fillup/" + car_id + "/getSumFuelLastThirtyDays", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          totalCost = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return totalCost;
  },

  async getFillUpById(fill_id) {
    let fillup;
    let promise = ajax
      .request("/fillup/" + fill_id + "/getFillUpById", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          fillup = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return fillup;
  },
  async getMaxOdomByCar(car_id) {
    let maxOdo;
    let promise = ajax
      .request("/fillup/" + car_id + "/getMaxOdomByCar", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          maxOdo = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return maxOdo;
  },
};
