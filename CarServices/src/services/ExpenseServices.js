import ajax from "./Service";

export default {
  async getExpenseByCar(car_id) {
    let expenses;
    let promise = ajax
      .request("/expense/" + car_id + "/getExpenseByCar", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          expenses = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return expenses;
  },
};
