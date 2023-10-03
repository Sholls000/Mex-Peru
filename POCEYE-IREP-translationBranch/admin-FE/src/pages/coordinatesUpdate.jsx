import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/mainLayout";
import ReactTooltip from "react-tooltip";
import toastr from "../utils/toastr";
import CoordinateService from "../services/coordinatesService";
import CredentialService from "../services/credentialsService";
import { validationLatitudeLongitude } from "validation-latitude-longitude";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CoordinatesUpdatePage() {
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [longitudeValue, setLongitude] = useState(null);
  const [latitudeValue, setLatitude] = useState(null);
  const [pocId, setPocId] = useState("");
  const [outletName, setOutletName] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [tooltip, showTooltip] = useState(true);

  const country = localStorage.getItem("country");
  const token = localStorage.getItem("token");

  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);

    setLoading(false);
  }, []);

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };
  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };
  const handlePocIdChange = (e) => {
    setPocId(e.target.value);
  };

  const postPayload = {
    longitude: longitudeValue || searchResult?.longitude,
    latitude: latitudeValue || searchResult?.latitude,
    pocId,
    outletName: searchResult?.outlet,
    token,
  };
  // console.log("postPayload", postPayload);
  //this was created to avoid re-renders from multiple re-assignment on useState Objects

  const postPayloadToDb = async () => {
    setLoading(true);

    if (!validationLatitudeLongitude.longitude(postPayload?.longitude)) {
      setLoading(false);
      return toastr("error", t("invalidLongitude"));
    } else if (!validationLatitudeLongitude.latitude(postPayload?.latitude)) {
      setLoading(false);
      return toastr("error", t("invalidLatitude"));
    }

    let request;

    if (country === "mexico") {
      request = await CoordinateService.postCordinates(postPayload);
      setLoading(false);
    } else if (country === "peru") {
      request = await CoordinateService.postCordinatesPeru(postPayload);
      setLoading(false);
    }

    if (request) {
      setLoading(false);

      toastr("success", t("description.coordinateSaved"));
      setLoading(false);
      setLatitude(null);
      setLongitude(null);
      setOutletName("");
      setPocId("");
      setRedirectUrl("/dashboard");

    } else {
      setLoading(false);
      return toastr("error", "Coordinates could not be saved");
    }
    // setLoading(false);
    // window.location.reload();
    // return;
  };

  const searchByPoc = async (e) => {
    if (e.code === "Enter" || ((e.key === 13 || e.key === "Enter") && e.location === 3)) {
      setLoading(true);
      const retrievedData =
        country === "mexico"
          ? await CoordinateService.getPock(e.target.value)
          : await CoordinateService.getPockPeru(e.target.value);
      setLoading(false);
      if (!retrievedData?.result) {
        setLoading(false);
        return toastr("error", "invalid POC ID");
      }
      setSearchResult(retrievedData?.result);
      setOutletName(retrievedData?.result?.outlet);
      setLoading(false);
    }
  };

  return redirectUrl ? (
    <Navigate to={redirectUrl} replace={true} />
  ) : (
    <MainLayout
      title={t("description.updateCoordinate")}
      loading={loading}
      showFullLoader={loading}
    >
      <div className="col-md-auto p-5">
        <form noValidate validated={validated}>
          <div row className="mb-3 g-3">
            <div className="col-md-6">
              <label>
                <b>Poc ID</b>
              </label>
              <small className="text-danger ml-1">*</small>
              <small className="text-muted">{t("description.searchPocId")}</small>
              <input
                type="text"
                placeholder="Poc ID"
                className="form-control required"
                value={pocId}
                onChange={handlePocIdChange}
                name="pocId"
                onKeyDown={async (e) => await searchByPoc(e)}
                required
              />
            </div>

            {searchResult?.outlet && (
              <div row className="mb-3 g-3">
                <div className="col-md-6">
                  <label>
                    <b>Outlet Name</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Name of outlet"
                    className="form-control required"
                    value={searchResult?.outlet}
                    // onChange={handleOutletNameChange}
                    name="pocId"
                    required
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label>
                    <b>{t("description.longitude")}</b>
                  </label>
                  <em
                    data-tip
                    data-for="LongitudeTip"
                    className="icon ni ni-help-fill text-primary fs-16px"
                  ></em>
                  <div className="form-control-wrap">
                    {tooltip && (
                      <ReactTooltip id="LongitudeTip" className="ml-4 pl-4">
                        {t("description.longitudeToolTip1")} <br />
                        {t("description.longitudeToolTip2")} <br />
                        {t("description.longitudeToolTip3")} <br />
                        {t("description.longitudeToolTip4")}
                      </ReactTooltip>
                    )}
                    <input
                      data-tip
                      data-for="LongitudeTip"
                      type="text"
                      placeholder={t("description.longitude")}
                      className="form-control required"
                      defaultValue={searchResult?.longitude || longitudeValue}
                      onChange={handleLongitudeChange}
                      name="pocId"
                      required
                      onMouseEnter={() => showTooltip(true)}
                      onMouseLeave={() => {
                        showTooltip(false);
                        setTimeout(() => showTooltip(true), 50);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label>
                    <b>{t("description.latitude")}</b>
                  </label>
                  <em
                    data-tip
                    data-for="LatitudeTip"
                    className="icon ni ni-help-fill text-primary fs-16px"
                  ></em>
                  <div className="form-control-wrap">
                    {tooltip && (
                      <ReactTooltip id="LatitudeTip" className="ml-4 pl-4">
                        {t("description.latitudeToolTip1")} <br />
                        {t("description.latitudeToolTip2")} <br />
                        {t("description.latitudeToolTip3")} <br />
                        {t("description.latitudeToolTip4")}
                      </ReactTooltip>
                    )}
                    <input
                      data-tip
                      data-for="LatitudeTip"
                      type="text"
                      placeholder={t("description.latitude")}
                      className="form-control required"
                      defaultValue={searchResult?.latitude || latitudeValue}
                      onChange={handleLatitudeChange}
                      name="pocId"
                      required
                      onMouseEnter={() => showTooltip(true)}
                      onMouseLeave={() => {
                        showTooltip(false);
                        setTimeout(() => showTooltip(true), 50);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div class="gap gap-20px"></div>
          {searchResult?.outlet && (
            <div className="form-group  py-2 my-3">
              <button
                type="button"
                className="btn btn-md btn-dark btn-wide px-5 mr-3"
                onClick={() => postPayloadToDb()}
              >
                {t("description.updateCoordinate")}
              </button>
            </div>
          )}
        </form>
      </div>
    </MainLayout>
  );
}
