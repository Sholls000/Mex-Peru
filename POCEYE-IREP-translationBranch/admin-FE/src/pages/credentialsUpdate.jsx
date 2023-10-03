import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/mainLayout";
// import { Validator, ValidateGroup } from "../components/validator";
import toastr from "../utils/toastr";
import CredentialService from "../services/credentialsService";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PasswordUpdatePage() {
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [emailAddress, setEmail] = useState(null);
  const [predictiveText, setPredictiveText] = useState([]);
  const [formattedSuggestions, setFormattedSuggestions] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [entireUsersList, setEntireUsersList] = useState([]);
  const [redirectUrl, setRedirectUrl] = useState(null);

  const country = localStorage.getItem("country");
  const token = localStorage.getItem("token");

  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    retrieveAllUsers();
    // pocFetch();
    // console.log(country);
    setLoading(false);
    //eslint-disable-next-line
  }, []);

  const retrieveAllUsers = async () => {
    let listOfUsers = await CredentialService.getAllUsers();
    let peruUsers = await CredentialService.getAllUsersPeru();
    if (country === "mexico") {
      setEntireUsersList(listOfUsers);
      let listOfUsers2 = listOfUsers?.map((list) => list?.email);
      setPredictiveText(listOfUsers2); //This will be used for predictive text.
    } else if (country === "peru") {
      setEntireUsersList(peruUsers);
      let peruUsers2 = peruUsers?.map((list) => list?.email);
      setPredictiveText(peruUsers2); //This will be used for predictive text.
    }
  };

  const handleEmailChange = (e) => {
    const inputedValue = e.target.value;
    if (inputedValue.length > 0) {
      const regex = new RegExp(`^${inputedValue}`, "i");
      const suggestions = predictiveText?.sort().filter((v) => regex.test(v));
      setFormattedSuggestions(suggestions);
      setSelectedText(inputedValue);

      setEmail(inputedValue);
    }
  };
  let suggestionSelected = (value) => {
    setSelectedText(value);
    setFormattedSuggestions("");
  };
  const renderSuggestions = () => {
    if (formattedSuggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {formattedSuggestions?.map((item) => (
          <li onClick={() => suggestionSelected(item)}>{item}</li>
        ))}
      </ul>
    );
  };

  let payloadItems = entireUsersList?.find((list) => list?.email === selectedText);
  let resetPayload = {
    activated: 0,
    email: payloadItems?.email,
    id: parseInt(payloadItems?.id),
    region: payloadItems?.region,
    type: payloadItems?.type,
    token,
  };
  let userId = parseInt(resetPayload.id);

  const postPayloadToDb = async () => {
    if (!payloadItems) {
      return toastr("error", t("description.invalidEmailOrPocId"));
    }
    setLoading(false);

    if (country === "mexico") {
      let request = await CredentialService.postPasswordReset(userId, resetPayload);
      if (request) {
        setEmail(null);
        setSelectedText(null);
        toastr("success", t("description.validCredentials"));
        setRedirectUrl("/dashboard");
        return;
      } else if (!request) setLoading(true);
      return toastr("error", "Credentials could not be saved");
    } else if (country === "peru") {
      const request = await CredentialService.postPasswordResetPeru(userId, resetPayload);
      if (request) {
        // console.log(request);
        setEmail(null);
        toastr("success", t("description.validCredentials"));
        setRedirectUrl("/dashboard");
        return;
      } else if (!request) setLoading(true);
      return toastr("error", "Credentials could not be saved");
    }
  };

  return redirectUrl ? (
    <Navigate to={redirectUrl} replace={true} />
  ) : (
    <MainLayout title={t("description.passwordReset")}>
      <div className="card-inner p-5">
        <form>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label ">{t("description.email")}</label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  placeholder={t("description.email")}
                  className="form-control py-4 required"
                  value={selectedText}
                  onChange={handleEmailChange}
                  name="emailAddress"
                  required
                />
              </div>
            </div>
            {formattedSuggestions.length > 0 && (
              <div className="suggestion small-scrollbar">{renderSuggestions()}</div>
            )}
          </div>
          <div className="form-group pl-3 py-2 my-3">
            <button
              type="button"
              className="btn btn-md btn-dark btn-wide px-5 mr-3"
              onClick={() => postPayloadToDb()}
            >
              {t("description.resetPassword")}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
