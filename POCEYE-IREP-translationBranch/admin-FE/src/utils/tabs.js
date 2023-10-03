import React, { Component } from "react";

export default function Tabs({
  headers,
  contents,
  id,
  contentPadding,
  _firstIndex,
}) {
  contentPadding = contentPadding || 0;

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
  const tabId = id || randomString(15);
  let firstIndex = _firstIndex || 0;
  let savedIndex = sessionStorage.getItem(`currenttab_${tabId}`);
  if (savedIndex) {
    firstIndex = parseInt(savedIndex);
  }

  const saveCurrentTab = (tabIndex) => {
    console.log(`current tab set to: `, tabIndex);
    sessionStorage.setItem(`currenttab_${tabId}`, tabIndex);
  };

  return !headers ? null : (
    <>
      {headers.length <= 1 ? null : (
        <ul
          className="nav nav-tabs tab-transparent"
          id={"myTab" + tabId}
          role="tablist"
        >
          {headers.map(
            (item, index) =>
              item.show !== false && (
                <li
                  className="nav-item"
                  key={index}
                  onClick={() => saveCurrentTab(index)}
                >
                  <a
                    className={
                      "nav-link" + (index == firstIndex ? " active " : "")
                    }
                    id={"myTab" + tabId + "_" + index.toString() + "-tab"}
                    data-toggle="tab"
                    href={"#myTab" + tabId + "_" + index.toString()}
                  >
                    <em className={item.icon} />

                    <span className="nav-text">{item.text || item}</span>
                  </a>
                </li>
              )
          )}
        </ul>
      )}

      <div
        className={`tab-content m-0 p-${contentPadding} border-0`}
        id={"myTab" + tabId + "Content"}
      >
        {contents.map((item, index) => (
          <div
            key={index}
            className={
              "tab-pane fade " + (index == firstIndex ? "active show" : "")
            }
            id={"myTab" + tabId + "_" + index.toString()}
            role="tabpanel"
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
}
