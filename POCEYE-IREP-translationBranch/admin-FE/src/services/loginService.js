import apiCall from "../utils/apiCall";
import { dynamicSort } from "../utils/utilityFunctions";
import apiCallPeru from "../utils/apiCallPeru";

export default class LoginService {
  static mexicoLogin = async (payload) => {
    return await apiCall(`/login/`, "POST", payload);
  };

  static peruLogin = async (payload) => {
    return await apiCallPeru(`/login/`, "POST", payload);
  };

  static getPockList = async () => {
    return await apiCall(`/getallpocs`);
  };
}
