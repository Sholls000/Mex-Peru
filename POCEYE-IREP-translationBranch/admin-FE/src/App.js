import React, { Component, useEffect, useState } from "react";
import { DataContext } from "./contexts/dataContexts";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import dotenv from "dotenv";

import AppRoutes from "./routes/index";
import { nonPrivateRoutes } from "./routes/index";
import Spinner from "./utils/spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/mainLayout";
import { getQueryObjectFromString } from "./utils/utilityFunctions";
import ProtectedRoute from "./utils/ProtectedRoute";
import ukFlag from "./images/Uk_flag.png";
import { useTranslation } from "react-i18next";

function App() {
  const [globalState, setGlobalState] = useState({});
  const [defaultLanguage, setDefaultLanguage] = useState({
    img: ukFlag,
    nativeName: "English",
    lang: "en",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { i18n } = useTranslation();

  const addItem = (key, value) => {
    let _globalState = globalState;
    _globalState[key] = value;
    setGlobalState(_globalState);
    console.log(`${key} added to global state: `, value);
  };

  const setLoggedInUser = (_user, error) => {
    addItem("user", _user);
    setLoading(false);
  };

  useEffect(() => {
    i18n.changeLanguage(defaultLanguage.lang);
    //eslint-disable-next-line
  }, [defaultLanguage]);

  return errorMessage ? (
    <p>{errorMessage}</p>
  ) : loading ? (
    <></>
  ) : (
    // <Spinner />
    <DataContext.Provider value={{ globalState, addItem, defaultLanguage, setDefaultLanguage }}>
      <ToastContainer />
      <BrowserRouter basename={process.env.REACT_APP_SUBFOLDER}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            {AppRoutes.map((route, index) => (
              <Route key={index} exact path={route.route} element={<route.component />} />
            ))}
          </Route>
          {nonPrivateRoutes.map((route, index) => (
            <Route key={index} exact path={route.route} element={<route.component />} />
          ))}
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
