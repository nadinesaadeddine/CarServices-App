import ajax from "./Service";
export default {
  async saveAddress(bodyReq, updateAddress) {
    let endpoint;
    let address;

    if (updateAddress) endpoint = "/addressBook/update";
    else endpoint = "/addressBook/create";

    let promise = ajax
      .request(endpoint, bodyReq)
      .then((data) => {
        //console.log(data);
        if (!data.success) throw new Error(data.message);
        else {
          address = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return address;
  },

  async getAddressesByUser(user_id) {
    let address;
    let promise = ajax
      .request("/addressBook/" + user_id + "/getAddressesByUser", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          address = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return address;
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
  async deleteAddress(address_id) {
    let address;
    let promise = ajax
      .request("/addressBook/" + address_id + "/destroy", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          address = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return address;
  },

  async getAddressById(address_id) {
    let address;
    let promise = ajax
      .request("/addressBook/" + address_id + "/getAddressById", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          address = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;

    return address;
  },
};
