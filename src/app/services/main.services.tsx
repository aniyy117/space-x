import { API } from "./api-services";

const url = "/history";
const addressUrl = "/payloads";

class Main {
  get = () => {
    return API.get(url);
  };
  getAddRess = () => {
    return API.get(addressUrl);
  };
}

const MainSerices = new Main();

export default MainSerices;
