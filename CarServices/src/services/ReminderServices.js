import ajax from "./Service";

export default {
  async createReminder(bodyReq) {
    let reminder;
    let promise = ajax
      .request("/reminder/create", bodyReq)
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          reminder = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return reminder;
  },

  async updateReminder(bodyReq) {
    let reminder;
    let promise = ajax
      .request("/reminder/update", bodyReq)
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          reminder = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));
    await promise;
    return reminder;
  },

  async deleteReminder(reminder_id) {
    let reminder;
    let promise = ajax
      .request("/reminder/" + reminder_id + "/destroy", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          reminder = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return reminder;
  },

  async getRemindersByUser(user_id) {
    let reminder;
    let promise = ajax
      .request("/reminder/" + user_id + "/getRemindersByUser", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          reminder = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return reminder;
  },
  async getNotifyRemindersByUser(user_id) {
    let reminder;
    let promise = ajax
      .request(
        "/reminder/" + user_id + "/getNotifyRemindersByUser",
        null,
        "GET"
      )
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          reminder = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return reminder;
  },

  async getReminderById(reminder_id) {
    let reminder;
    let promise = ajax
      .request("/reminder/" + reminder_id + "/getReminderById", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          reminder = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return reminder;
  },

  async getOverdueReminder(car_id) {
    let reminder;
    let promise = ajax
      .request("/reminder/" + car_id + "/getOverdueReminder", null, "GET")
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        else {
          reminder = data.data;
        }
      })
      .catch((error) => console.error("Error: " + error));

    await promise;
    return reminder;
  },
};
