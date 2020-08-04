import config from "../../config/config";
import { AsyncStorage } from "react-native";
const URI = config.URI;
const getToken = async () => {
  let token = JSON.parse(await AsyncStorage.getItem("api_token"));

  return token;
};
let token = null;
AsyncStorage.getItem("api_token").then((value) => {
  token = JSON.parse(value);
});
console.log(token);

//, 'Authorization': `Bearer ${token}`
export default {
  async request(endpoint, bodyReq = null, method = "POST") {
    //console.log(endpoint);
    return method === "POST"
      ? fetch(URI + "/api" + endpoint, {
          method: method,
          body: JSON.stringify(bodyReq),
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          //console.log(response.text());
          if (!response.ok) throw new Error("Network response was not ok");
          else return response.json();
          //return response.text();
        })
      : fetch(URI + "/api" + endpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            else return response.json();
          })
          .catch((error) => console.error("Error: " + error));
  },
};
