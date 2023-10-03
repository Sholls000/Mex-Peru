import React, { Component, useEffect, useState } from "react";
import TopNav from "./topnav";
import Sidebar from "./sidebar";
import LinearActivity from "../components/linearActivity";
import { Navigate } from "react-router";
import Spinner from "../utils/spinner";
import { useTranslation } from "react-i18next";

export default function MainLayout({
  preTitle,
  title,
  subTitle,
  pageActions,
  children,
  loading,
  redirectUrl,
  showFullLoader,
  transparentBackground,
}) {
  const [isLoading, setIsLoading] = useState(loading);
  const { t } = useTranslation();

  useEffect(() => {}, [loading, redirectUrl]);

  return redirectUrl ? (
    <Navigate to={redirectUrl} />
  ) : (
    <div className="nk-main ">
      {isLoading && (
        <div
          style={{
            top: "45px",
            position: "fixed",
            width: "100%",
            left: "0",
            zIndex: "999",
          }}
        >
          <LinearActivity />
        </div>
      )}
      <Sidebar
        administrator={t("description.administrator")}
        changeCoordinate={t("description.changeCoordinate")}
        passwordReset={t("description.passwordReset")}
      />

      <div className="nk-wrap ">
        <TopNav />
        {/* content @s */}
        <div className="nk-content px-0 pb-0 w-100">
          <div className="container-fluid">
            <div className="nk-content-inner">
              <div className="nk-content-body">
                <div className="nk-block-head nk-block-head-sm">
                  <div className="nk-block-between">
                    <div className="nk-block-head-content">
                      {preTitle && <div className="nk-block-head-sub">{preTitle} </div>}
                      <h3 className="nk-block-title page-title col">{title}</h3>
                      <div className="nk-block-des text-soft col">
                        {subTitle && <p>{subTitle}</p>}
                      </div>
                    </div>
                    <div className="nk-block-head-content">{pageActions}</div>
                  </div>
                </div>
                <div className="nk-block">
                  <div className="row g-gs">
                    <div
                      className={`card col main-card-container ${
                        transparentBackground && "bg-transparent"
                      }`}
                    >
                      {showFullLoader ? (
                        <div className="center">
                          <Spinner />
                        </div>
                      ) : (
                        children
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
