import { useRef, useState, useEffect, useContext } from "react";
import pocEyeLogo from "../images/logo.png";
import authLogo from "../images/authentication-pana.svg";
import toastr from "../utils/toastr";
import LoginService from "../services/loginService";
import { useNavigate } from "react-router-dom";
import PayloadUpdater from "../utils/payloadUpdater"

import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import { DataContext } from "../contexts/dataContexts";

import ukFlag from "../images/Uk_flag.png";
import spainFlag from "../images/spain_flag.png";


const Register = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const country = useRef(null);
  const [payload, setPayload] = useState({});
  // const [password, setPassword] = useState();
  // const [email, setEmail] = useState();
  const navigate = useNavigate();

 const addPayload = new PayloadUpdater({
    payload: payload,
    setPayload: setPayload,
 }).update;

 const validatorGroup = "login";
//  console.log("payload: ", payload)

  const { t, i18n } = useTranslation();

  const { defaultLanguage, setDefaultLanguage } = useContext(DataContext);

  useEffect(() => {
    i18n.changeLanguage(defaultLanguage.lang);
    //eslint-disable-next-line
  }, [defaultLanguage]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    /* ################################################# */
    // GET USER LOGIN DATA
    /* ################################################ */

    const loginPayload = {
      email: payload.email,
      password: payload.password,
    };

    

    // GET THE USER SELECTED COUNTRY

    const userCountry = country.current.value;

    /* ################################################# */
    // CHECK IF THE USER HAVE SELECTED A COUNTRY
    /* ################################################ */

    if (userCountry === "select-country") {
      return toastr("error", t("description.invalidCountry"));
    }

    /* ################################################# */
    // STORE THE USER DATA AND NAVIGATE THE USER TO
    // THE COORDINATES PAGE AFTER SUCCESSFULL LOGIN
    /* ################################################ */

    const storeUserData = (user) => {
      localStorage.setItem("token", user.token);
      localStorage.setItem("country", userCountry);
      localStorage.setItem("email", email.current.value);
      navigate("/dashboard");
      return toastr("success", t("description.loginSuccess"));
    };

    /* ################################################# */
    // LOG THE USER IN THROUGH THE PERU SERVER
    /* ################################################ */

    const loginPeru = async () => {
      // console.log(loginPayload);

      try {
        const user = await LoginService.peruLogin(loginPayload);
        storeUserData(user);
        
      } catch (error) {
        return toastr("error", t("description.invalidLogin"));
      }
    };

    /* ################################################# */
    // LOG THE USER IN THROUGH THE MEXICO SERVER
    /* ################################################ */

    const loginMexico = async () => {
      // console.log(loginPayload);

      try {
        const user = await LoginService.mexicoLogin(loginPayload);
        storeUserData(user);
      } catch (err) {
        return toastr("error", t("description.invalidLogin"));
      }
    };

    /* ################################################# */
    // CHECK THE USER'S COUNTRY, SO AS TO KNOW WHICH SERVER
    // TO LOG THE USER IN WITH
    /* ################################################ */
    // const user = userCountry === "mexico" ? loginMexico : loginPeru;
    let user;

    if (userCountry === "mexico") {
      user = loginMexico;
    }

    if (userCountry === "peru") {
      user = loginPeru;
    }

    // LOGIN THE USER IN
    user();
  };

  // Language DropDown
  const dropDownOptions = [
    { img: ukFlag, nativeName: "English", lang: "en" },
    { img: spainFlag, nativeName: "Español", lang: "es" },
  ];

  // Toggle the language dropdown
  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  // change webpage language
  const changeLanguage = (language) => {
    setDefaultLanguage(language);
  };

  return (
    <>
      <main>
        {/* ============================================= */}
        {/* =============LANGUAGE DROPDOWN=============== */}
        {/* ============================================= */}
        <div
          style={{
            width: "10%",
            position: "absolute",
            top: "20px",
            right: "25px",
            marginLeft: "auto",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
          onClick={toggleDropDown}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              cursor: "pointer",
            }}
          >
            <img
              style={{ height: "15px", width: "20px", marginRight: "8px" }}
              src={defaultLanguage.img}
              alt=""
            />
            {defaultLanguage.nativeName}
            <div>{isDropDownOpen ? <VscChevronUp /> : <VscChevronDown />}</div>
          </div>
          {isDropDownOpen && (
            <ul
              style={{
                position: "absolute",
                left: "0",
                top: "30px",
                background: "white",
                width: "100%",
                padding: "10px 8px",
                border: "1px solid #DCDDDD",
              }}
            >
              {dropDownOptions.map((language, id) => {
                return (
                  <li
                    key={id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      marginBottom: "8px",
                    }}
                    onClick={() => changeLanguage(language)}
                  >
                    <img
                      style={{ height: "15px", width: "20px", marginRight: "8px" }}
                      src={language.img}
                      alt=""
                    />
                    {language.nativeName}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* ########################################################## */}
        {/* ############## DISPLAY ON SMALL SCREENS ONLY   ########### */}
        {/* ########################################################## */}

        <div className="container d-xl-none">
          <div className="row vh-100 d-flex justify-content-center align-items-center">
            <div className="col col-sm-7 col-lg-5">
              <form className="card shadow px-4 py-5" onSubmit={handleFormSubmit}>
                <img src={pocEyeLogo} alt="" className="mx-auto mb-4" style={{ width: "100px" }} />

                <div>
                  <div>
                    <label htmlFor="country" className="fw-bolder">
                      {t("description.country")}
                    </label>

                    <select
                      name="country"
                      onChange={(e) => (country.current.value = e.target.value)}
                    >
                      <option value="select-country">{t("description.selectCountry")}</option>
                      <option value="mexico">Mexico</option>
                      <option value="peru">Peru</option>
                    </select>
                  </div>
                </div>
                <div className="my-3">
                  <label htmlFor="email" className="fw-bolder">
                    {t("description.email")}
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-xl"
                    name="email"
                    placeholder="name@example.com"
                    // ref={email}
                    onChange={(e) => addPayload("email", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="fw-bolder">
                    {t("description.password")}
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-xl"
                    name="password"
                    placeholder={t("description.password")}
                    // ref={password}
                    onChange={(e) => addPayload("password", e.target.value)}

                  />
                </div>
                <button
                  type="submit"
                  style={{
                    fontWeight: "bolder",
                    fontSize: "15px",
                    background: "rgb(255,114,94)",
                    border: "1px solid rgb(255, 114, 94)",
                    color: "white",
                  }}
                  className="btn btn-transparent py-2 w-100 mx-auto d-flex justify-content-center"
                >
                  {t("description.signin")}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ########################################################## */}
        {/* ############## DISPLAY ON LARGE SCREENS ONLY   ########### */}
        {/* ########################################################## */}

        <div className="d-none d-xl-flex justify-content-center align-items-center vh-100">
          <div className="d-none d-lg-block w-90 vh-100 bg-light">
            <img src={authLogo} alt="" className="" />
          </div>
          <div className="container-lg">
            {/* ###### POCEYE LOGO ####### */}

            <div className="text-center pt-3">
              <img
                src={pocEyeLogo}
                alt=""
                className="mx-auto text-center"
                style={{
                  width: "120px",
                  marginBottom: "50px",
                }}
              />
            </div>

            {/* ###################################################### */}

            {/* ############ LOGIN FORM ########## */}
            <form className="px-4 pb-5 w-65 m-auto align-self-center" onSubmit={handleFormSubmit}>
              {/* ############### COUNTRY DROPDOWN ############## */}

              <div>
                <label htmlFor="country" className="fw-bolder">
                  {t("description.country")}
                </label>

                <select className="" aria-label="" name="country" ref={country}>
                  <option defaultValue="select-country" value="select-country">
                    {t("description.selectCountry")}
                  </option>
                  <option value="mexico">Mexico</option>
                  <option value="peru">Peru</option>
                </select>
              </div>

              {/* ###################################################### */}

              {/* ################### EMAIL ADDRESS ####################### */}
              <div className="my-3">
                <label htmlFor="email" className="fw-bolder">
                  {t("description.email")}
                </label>
                <input
                  type="email"
                  className="form-control form-control-xl w-100"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  ref={email}
                />
              </div>

              {/* ###################################################### */}

              {/* ############### PASSWORD FIELD ######################## */}
              <div className="mb-4">
                <label htmlFor="password" className="fw-bolder">
                  {t("description.password")}
                </label>
                <input
                  type="password"
                  className="form-control form-control-xl"
                  name="password"
                  id="password"
                  placeholder={t("description.password")}
                  ref={password}
                />
              </div>

              {/* ####################################################### */}

              {/* ################# BUTTON FIELD ####################### */}

              <button type="submit" className="login_btn py-2 mx-auto">
                {t("description.signin")}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
