import ajax from "./Service";
export default {
  async saveCar(bodyReq, updateCar) {
    let endpoint;
    let carProfile;
    console.log(bodyReq);
    if (updateCar) endpoint = "/carProfile/update";
    else endpoint = "/carProfile/create";

    let promise = ajax
      .request(endpoint, bodyReq)
      .then((data) => {
        //console.log(data);
        if (!data.success) throw new Error(data.message);
        else {
          carProfile = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return carProfile;
  },

  async getCarsByUser(user_id) {
    let carProfile;
    let promise = ajax
      .request("/carProfile/" + user_id + "/getCarsByUser", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          carProfile = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return carProfile;
  },
  async getCarsById(car_id) {
    let carProfile;
    let promise = ajax
      .request("/carProfile/" + car_id + "/getCarsById", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          carProfile = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return carProfile;
  },
  async deleteCar(car_id) {
    let carProfile;
    let promise = ajax
      .request("/carProfile/" + car_id + "/destroy", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          carProfile = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return carProfile;
  },
  async getDefaultCar(user_id) {
    let carProfile;
    let promise = ajax
      .request("/carProfile/" + user_id + "/getDefaultCarByUser", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          carProfile = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return carProfile;
  },
};
