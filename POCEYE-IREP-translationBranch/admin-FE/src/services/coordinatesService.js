import apiCall from "../utils/apiCall";
import apiCallPeru from "../utils/apiCallPeru";
import { dynamicSort } from "../utils/utilityFunctions";


export default class CoordinateService {
  static postCordinates = async (payload) => {
    return await apiCall(`/changecoordinates`, "POST", payload);
  };

  static postCordinatesPeru = async (payload) => {
    return await apiCallPeru(`/changecoordinates`, "POST", payload);
  };

  static getPockList = async () => {
    return await apiCall(`/getallpocs`);
  };

  static getPockListPeru = async () => {
    return await apiCallPeru(`/getallpocs`);
  };

  static getPock = async (id) => {
    return await apiCall(`/getPoc/${id}`);
  };

  static getPockPeru = async (id) => {
    return await apiCallPeru(`/getPoc/${id}`);
  };
}
