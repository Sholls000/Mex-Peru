import apiCall from "../utils/apiCall";
import apiCallPeru from "../utils/apiCallPeru";
import { dynamicSort } from "../utils/utilityFunctions";
import { useContext } from "react";
import { DataContext } from "../contexts/dataContexts";

export default class CredentialService {
  // static postPasswordReset = async (payload) => {
  //   return await apiCall(`/resetpassword`, "POST", payload);
  // };
  
  static postPasswordReset = async (id, payload) => {
    return await apiCall(`/resetpassword/${id}`, "PUT", payload);
  };

  static postPasswordResetPeru = async (id, payload) => {
    return await apiCallPeru(`/resetpassword/${id}`, "PUT", payload);
  };

  static getAllUsers = async () => {
    return await apiCall(`/allusers`);
  };

  static getAllUsersPeru = async () => {
    return await apiCallPeru(`/allusers`);
  };
}
