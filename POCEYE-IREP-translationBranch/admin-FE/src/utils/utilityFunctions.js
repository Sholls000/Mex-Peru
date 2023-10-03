import { camelCase } from "lodash";
import moment from "moment";

const toReadableDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  const response = [day, month, year].join("/");
  if (response.includes("NaN")) return "";
  return [day, month, year].join("/");
};

const dateToYYYY_MM_DD = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const isPhoneValid = (phoneNumber) => {
  if (phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.substr(1);
  }

  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = phoneNumber.replace(/\D/g, "");
  return phoneRe.test(digits);
};

const currencyFormat = (amount) => {
  return Number(parseFloat(amount).toFixed(2)).toLocaleString("en", {
    minimumFractionDigits: 2,
  });
};

const removeElementFromArray = (element, array) => {
  const _array = [...array];
  let index = array.indexOf(element);
  let removed = array.splice(index, 1);
  console.log("spliceAction", { element, index, _array, removed });
};

const camelizeKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    let result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const generateQueryString = (queryObject) => {
  var result = "";
  for (const key in queryObject) {
    if (queryObject[key]) result += `${key}=${queryObject[key]}&`;
  }
  return result;
};

const currencySymbol = (currencyCode) => {
  let result = "₦";
  switch (currencyCode) {
    case "NGN":
      result = "₦";
      break;
    case "USD":
      result = "$";
      break;

    default:
      break;
  }
  return result;
};

const formatAmount = (amount, currency = "NGN") => {
  return currencySymbol(currency) + (amount || "0");
};

const toReadableDateTime = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    hour = "" + d.getHours(),
    minute = "" + d.getMinutes();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;
  if (minute.length < 2) minute = "0" + minute;

  const response =
    [day, month, year].join("/") + " " + [hour, minute].join(":");
  if (response.includes("NaN")) return "";
  return [day, month, year].join("/") + " " + [hour, minute].join(":");
};

const dateToYYYY_MM_DD_hh_mm = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    hour = "" + d.getHours(),
    minute = "" + d.getMinutes();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;
  if (minute.length < 2) minute = "0" + minute;

  return [year, month, day].join("-") + "T" + [hour, minute].join(":");
};

const durationByHours = (date, useDays) => {
  let days = moment.duration(date).days();
  let hours = Math.floor(moment.duration(date).asHours());
  let minutes = moment.duration(date).minutes();
  if (useDays) {
    hours = moment.duration(date).hours();
    return `${days}D ${hours}H ${minutes ? minutes + "M" : ""}`;
  }
  return `${hours}H ${minutes && minutes ? minutes + "M" : ""}`;
};

const checkUserPermission = (permission) => {
  const bypassAuth = process.env.REACT_APP_BYPASSAUTH === "true";
  if (bypassAuth) return true;

  const userPermissions =
    localStorage.getItem("resu") &&
    JSON.parse(localStorage.getItem("resu"))?.permissions; //user backwards is the user storage
  if (!userPermissions) return false;
  // console.log(
  //   userPermissions.find(
  //     (userPermission) =>
  //       userPermission.Permission === "location_add_new_location"
  //   )
  // );
  return !!userPermissions.find(
    (userPermission) => userPermission.Permission === permission
  );
};

const getQueryObjectFromString = (url = "") => {
  const index = url.indexOf("?");
  if (index === -1) return {};
  const query = url.substr(index);
  const urlSearchParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const colorArray = ["#1ee0ac", " #f4bd0e", "#e85347", "#854fff", "#09c2de"];
const randomColor = () => {
  return colorArray[randomNumber(0, 13)];
};

const cycleColor = (index = 0) => {
  return colorArray[index % colorArray.length];
};

const formatValue = (value) => {
  if (value < 1e3) return value;
  if (value >= 1e3 && value < 1e6) return +(value / 1e3).toFixed(1) + "k";
  if (value >= 1e6 && value < 1e9) return +(value / 1e6).toFixed(1) + "m";
  if (value >= 1e9 && value < 1e12) return +(value / 1e9).toFixed(1) + "b";
  if (value >= 1e12) return +(value / 1e12).toFixed(1) + "t";
};

export {
  isPhoneValid,
  currencyFormat,
  toReadableDate,
  dateToYYYY_MM_DD,
  removeElementFromArray,
  camelizeKeys,
  randomString,
  dynamicSort,
  generateQueryString,
  currencySymbol,
  formatAmount,
  toReadableDateTime,
  dateToYYYY_MM_DD_hh_mm,
  durationByHours,
  checkUserPermission,
  getQueryObjectFromString,
  randomNumber,
  colorArray,
  randomColor,
  cycleColor,
  formatValue,
};
