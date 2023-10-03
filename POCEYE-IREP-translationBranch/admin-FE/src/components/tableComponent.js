import { isArray } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import "../styles/table.scss";
import { Link } from "react-router-dom";
import { randomString } from "../utils/utilityFunctions";
import VesselService from "../services/vesselService";
import toastr from "../utils/toastr";
import { checkUserPermission } from "../utils/utilityFunctions";

//{label: '', size: 'md!lg|sm'}

export default function TableComponent({
  columns,
  rowData,
  overflowActions,
  onSearchChange,
  reload,
  cacheKey,
  setLoading,
}) {
  if (!cacheKey) throw new Error("cacheKey is required for TableComponent");

  const pages = [10, 20, 30, 50];

  const handleInput = (e) => {
    if (onSearchChange && e.key === "Enter") {
      onSearchChange(e.target.value);
      e.target.value = "";
    }
  };

  // useEffect(() => {}, [rowData]);

  const reloadData = (_search, _page, _pageSize) => {
    reload && reload(_search, _page, _pageSize);
  };

  const rowTemplate = (row_data) => {
    const renderObjectElement = (item) => {
      if (isArray(item)) {
        return "";
      }
      return item;
    };
    const rowKeys = Object.keys(row_data);
    const hiddenColumns = ["vesselId", "activeVoyagePlanningId"];
    return (
      <div className="nk-tb-item">
        {rowKeys.map(
          (property, index) =>
            !hiddenColumns.includes(property) && (
              <div
                className={`nk-tb-col ${columns[index].size && `tb-col-${columns[index].size}`
                  }`}
              >
                {typeof row_data[property] === "object" ? (
                  row_data[property]
                ) : (
                  <span>{row_data[property]}</span>
                )}
              </div>
            )
        )}

        <div className="nk-tb-col nk-tb-col-tools">
          <ul className="nk-tb-actions gx-2">
            {null && (
              <li className="nk-tb-action-hidden">
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-trigger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Suspend"
                >
                  <em className="icon ni ni-user-cross-fill" />
                </a>
              </li>
            )}
            <li>
              <div className="drodown">
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <em className="icon ni ni-more-h" />
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <ul className="link-list-opt no-bdr">
                    {checkUserPermission("vessel_view_details") && (
                      <li>
                        <Link to={`/vessel/${row_data.vesselId}`}>
                          <em className="icon ni ni-eye" />
                          <span>View Details</span>
                        </Link>
                      </li>
                    )}
                    {checkUserPermission("vessel_view_compliance") && (
                      <li>
                        <Link to={`/compliance/${row_data.vesselId}`}>
                          <em className="icon ni ni-file-docs" />
                          <span>Compliance</span>
                        </Link>
                      </li>
                    )}
                    {/* <li><a href="#"><em class="icon ni ni-edit" onclick="return false"></em>Edit Vessel Ownership</span></a></li> */}
                    <li className="divider" />
                    {checkUserPermission("vessel_voyage_history") && (
                      <li>
                        <Link
                          to={`/voyage-history?vesselId=${row_data.vesselId}`}
                        >
                          <em className="icon ni ni-history" />
                          <span>Voyage History</span>
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to={`/product-request/all/${row_data.vesselId}`}>
                        <em className="icon ni ni-history" />
                        <span>Product Request</span>
                      </Link>
                    </li>

                    {row_data.activeVoyagePlanningId && (
                      <li>
                        <Link
                          to={`/view-activity/${row_data.activeVoyagePlanningId}`}
                        >
                          <em className="icon ni ni-activity" />
                          <span>Vessel Activities</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="table-component">
      <div className="card-inner-group">
        {(onSearchChange || reload) &&
          checkUserPermission("vessel_add_vessel") &&
          checkUserPermission("vessel_download_vessels") && (
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools">
                  <div className="form-inline flex-nowrap gx-3 search-form">
                    <em className="icon ni ni-search" />
                    <input
                      type="text"
                      className="form-control border-transparent search-input "
                      placeholder="search vessel name or IMO"
                      onKeyDown={handleInput}
                    />
                  </div>
                  {/* .form-inline */}
                </div>
                {/* .card-tools */}
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    <li className="btn-toolbar-sep" />
                    {/* li */}
                    <li>
                      <div className="toggle-wrap">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger toggle"
                          data-target="cardTools"
                        >
                          <em className="icon ni ni-menu-right" />
                        </a>
                        <div
                          className="toggle-content"
                          data-content="cardTools"
                        >
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <a
                                href="#"
                                className="btn btn-icon btn-trigger toggle"
                                data-target="cardTools"
                              >
                                <em className="icon ni ni-arrow-left" />
                              </a>
                            </li>
                            {/* li */}

                            <li>
                              <div className="dropdown">
                                <a
                                  href="#"
                                  className="btn btn-trigger btn-icon dropdown-toggle"
                                  data-toggle="dropdown"
                                >
                                  <em className="icon ni ni-setting" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                  <ul className="link-check">
                                    <li>
                                      <span>Show</span>
                                    </li>
                                    {pages.map((pageSize, index) => (
                                      <li
                                        onClick={() =>
                                          reloadData(null, null, pageSize)
                                        }
                                        key={index}
                                        className=""
                                      >
                                        <a href="#">{pageSize}</a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              {/* .dropdown */}
                            </li>
                            {/* li */}
                          </ul>
                          {/* .btn-toolbar */}
                        </div>
                        {/* .toggle-content */}
                      </div>
                      {/* .toggle-wrap */}
                    </li>
                    {/* li */}
                  </ul>
                  {/* .btn-toolbar */}
                </div>
                {/* .card-tools */}
              </div>
            </div>
          )}
        <div className="card-inner p-0">
          <div className="nk-tb-list nk-tb-ulist is-compact">
            <div className="nk-tb-item nk-tb-head">
              {columns.map((column, index) => (
                <div
                  key={index}
                  className={`nk-tb-col ${column.size && `tb-col-${column.size}`
                    }`}
                >
                  <span className="fw-bold fs-12px text-dark">
                    {column.label}
                  </span>
                </div>
              ))}

              {overflowActions && (
                <div className="nk-tb-col nk-tb-col-tools text-right"></div>
              )}
            </div>
            {/* .nk-tb-item */}

            {rowData.map((row_data, index) => rowTemplate(row_data))}
          </div>
          {/* .nk-tb-list */}
        </div>
        {/* .card-inner */}
      </div>
      {/* .card-inner-group */}
    </div>
  );
}
