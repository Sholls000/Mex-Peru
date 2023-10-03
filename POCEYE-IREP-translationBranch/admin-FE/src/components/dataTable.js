import React, { Component, useEffect, useState, useMemo } from "react";
import "../styles/dataTable.scss";
import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";

export default function DataTable({
  columns,
  data,
  deleteAction,
  enableSearch,
  reloadData,
  searchQuery,
  pageSize,
  page,
  cssArray,
  recordSelected,
  emptyMessage,
  striped,
  totalCount,
  paginationStyle,
  disablePageSize,
  rowActions,
  hidePagination,
  tableTopActions,
}) {
  // Use the state and functions returned from useTable to build your UI
  //console.log("table data", {columns, data});

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // prepareRow(rows[0]);
  // rows[0].cells[0].getCellProps();

  let _currentPage = page || 1;
  let _rowActions = rowActions || [];
  let showRowActions = _rowActions.find(
    (action) => action.show === true || action.show === undefined
  );
  let _tableTopActions = tableTopActions || "";
  const [currentPage, setCurrentPage] = useState(1);

  let _paginationStyle = paginationStyle || 1;
  let _pageSize = pageSize || 50;
  let _totalCount = totalCount || _pageSize;
  let _searchQuery = "";
  let pageOptions = ["10", "50", "100", "150"];
  let _cssArray = [];
  // I met the line below like this, not sure why it was done that way. I removed the second condition to make it work.
  // if (!cssArray || cssArray.length < columns.length) {
  if (!cssArray) {
    columns.forEach((element) => {
      _cssArray.push("");
    });
  } else {
    _cssArray = cssArray;
  }
  // console.log("arrr", _cssArray);

  const [filteredRows, setValue] = useState([...rows]);

  useEffect(() => {
    setValue([...rows]);
  }, [data]);

  function filterRow(event) {
    if (!event || !event.target) {
      setValue([...rows]);
    } else {
      if (reloadData) {
        console.log("reloadData");
        console.log(reloadData);
        __reloadData(null, 1, event.target.value);
        _searchQuery = event.target.value;
      } else {
        var _filteredRows = [];
        rows.forEach((element) => {
          if (
            JSON.stringify(element.original, function (key, value) {
              if (key.toLowerCase().includes("component")) {
                //properties with components have jsx causing circular reference
                return "";
              } else {
                return value;
              }
            })
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          ) {
            _filteredRows.push(element);
          }
        });
        setValue(_filteredRows);
      }
    }
  }

  function __deleteAction(_record) {
    deleteAction(_record);
  }

  function __reloadData(pageSizeParam, currentPageParam, _query) {
    if (pageSizeParam) _pageSize = pageSizeParam;
    if (currentPageParam) _currentPage = currentPageParam;
    if (!_query) _query = _searchQuery;
    reloadData(_currentPage, _pageSize, _query);
  }

  function __nextPage() {
    var pageToNavigateTo = (_currentPage || 1) + 1;
    __reloadData(null, pageToNavigateTo, null);
  }

  function __prevPage() {
    var pageToNavigateTo = (_currentPage || 2) - 1;
    __reloadData(null, pageToNavigateTo, null);
  }

  const changePage = async (p) => {
    if (p < 1) p = 1;
    if (p > Math.ceil(_totalCount / _pageSize) && _totalCount > 0)
      p = Math.ceil(_totalCount / _pageSize);
    _currentPage = p;
    setCurrentPage(p);
    console.log(currentPage);
    __reloadData(null, p);
  };

  const paginationTemplate = () => {
    const pages = [...Array(Math.ceil(_totalCount / _pageSize)).keys()];
    return (
      <ul className="pagination justify-content-center justify-content-md-start">
        <li
          onClick={() => _currentPage > 1 && changePage(_currentPage - 1)}
          className={`page-item ${_currentPage <= 1 && "disabled"}`}
        >
          <a className="page-link">Prev</a>
        </li>
        {pages.map((property, index) => (
          <li
            onClick={() => changePage(index + 1)}
            className={`page-item ${_currentPage == index + 1 ? "active" : ""}`}
          >
            <a className="page-link">{index + 1}</a>
          </li>
        ))}
        <li
          onClick={() =>
            _currentPage !== pages.length && changePage(_currentPage + 1)
          }
          className={`page-item ${_currentPage == pages.length && "disabled"}`}
        >
          <a className="page-link">Next</a>
        </li>
      </ul>
    );
  };

  // Render the UI for your table
  return (
    <div className="my-table datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded">
      {(_tableTopActions || enableSearch) && (
        <div
          className="card-inner position-relative card-tools-toggle"
          data-select2-id={29}
        >
          <div className="card-title-group" data-select2-id={9}>
            <div className="card-tools" data-select2-id={8}>
              <div className="form-inline flex-nowrap gx-3">
                {enableSearch ? (
                  <div
                    style={{ width: "50%", maxWidth: "300px", float: "left" }}
                  >
                    <div
                      className="input-group input-group-sm mb-4"
                      style={{ zoom: "0.75" }}
                    >
                      <div
                        className="input-group-prepend"
                        style={{ background: "transparent" }}
                      >
                        <span
                          className="input-group-text pr-2"
                          style={{
                            background: "#ffffff",
                            paddingRight: "0px",
                            height: "100%",
                            borderTop: "0px",
                            borderLeft: "0px",
                            borderRight: "0",
                          }}
                        >
                          <i
                            className="mdi mdi-magnify"
                            style={{ fontSize: "18px", lineHeight: "18px" }}
                          />
                        </span>
                      </div>
                      <input
                        autoFocus={true}
                        defaultValue={searchQuery}
                        style={{
                          borderLeft: "0px",
                          borderRight: "0px",
                          borderTop: "0px",
                        }}
                        type="text"
                        className="form-control kt-quick-search__input"
                        placeholder="Search..."
                        onChange={(e) => filterRow(e)}
                      />
                    </div>
                  </div>
                ) : null}

                {_currentPage <= 1 &&
                rows.length < _pageSize ? null : reloadData &&
                  !disablePageSize &&
                  !hidePagination ? (
                  <div
                    className="input-group input-group-sm mb-4"
                    style={{ zoom: "0.75" }}
                  >
                    <div
                      className="input-group-prepend"
                      style={{ background: "transparent" }}
                    >
                      <span
                        className="input-group-text pr-2"
                        style={{
                          background: "#eeeeff",
                          paddingRight: "0px",
                          height: "100%",
                          borderTop: "0px",
                          borderLeft: "0px",
                        }}
                      >
                        Page size
                      </span>
                    </div>
                    <select
                      style={{
                        borderLeft: "0px",
                        borderRight: "0px",
                        borderTop: "0px",
                      }}
                      type="text"
                      className="form-control kt-quick-search__input"
                      onChange={(e) => __reloadData(e.target.value)}
                      defaultValue={pageSize}
                    >
                      <option value="10">10</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="150">150</option>
                    </select>
                  </div>
                ) : null}
              </div>
              {/* .form-inline */}
            </div>
            {/* .card-tools */}

            {_tableTopActions}
          </div>
          {/* .card-title-group */}
          <div className="card-search search-wrap" data-search="search">
            <div className="card-body">
              <div className="search-content">
                <a
                  href="#"
                  className="search-back btn btn-icon toggle-search"
                  data-target="search"
                >
                  <em className="icon ni ni-arrow-left" />
                </a>
                <input
                  type="text"
                  className="form-control border-transparent form-focus-none"
                  placeholder="Search by Party name.."
                />
                <button className="search-submit btn btn-icon">
                  <em className="icon ni ni-search" />
                </button>
              </div>
            </div>
          </div>
          {/* .card-search */}
        </div>
      )}

      <br style={{ clear: "both", content: '""', lineHeight: "0px" }} />
      {filteredRows.length <= 0 ? (
        <p className="text-muted text-center mt-5">
          <em
            className=" icon ni ni-folders mb-3  d-inline-block mt-5"
            style={{ fontSize: "40px" }}
          ></em>
          <br /> {emptyMessage || "No results to show"}
        </p>
      ) : (
        <table
          {...getTableProps()}
          className={`datatable-table table ${striped && "table-striped"}`}
          style={{ display: "table", width: "100%" }}
        >
          <thead
            className="datatable-head"
            style={{ display: "table-header-group", width: "100%" }}
          >
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="datatable-row"
                style={{ display: "table-row" }}
              >
                {deleteAction ? (
                  <th style={{ width: "50px", display: "table-cell" }}></th>
                ) : null}
                {headerGroup.headers.map((column, index) => (
                  <th
                    style={{ display: "table-cell" }}
                    className={"datatable-cell " + _cssArray[index]}
                    {...column.getHeaderProps()}
                  >
                    <span>{column.render("Header")}</span>
                  </th>
                ))}
                {_rowActions && _rowActions.length > 0 && <th></th>}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="datatable-body"
            style={{ display: "table-row-group", width: "100%" }}
          >
            {filteredRows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  onClick={
                    recordSelected ? () => recordSelected(row.original) : null
                  }
                  style={{ display: "table-row" }}
                  className={
                    "animated fadeIn datatable-row nk-tb-item " +
                    (recordSelected ? " cursor-pointer " : "")
                  }
                  {...row.getRowProps()}
                >
                  {deleteAction ? (
                    <td
                      className="nk-tb-col"
                      style={{
                        width: "50px",
                        textAlign: "center",
                        display: "table-cell",
                      }}
                    >
                      <a
                        title="delete record"
                        className="delete-row-trigger"
                        onClick={() => __deleteAction(row.original)}
                      >
                        <em className="icon ni ni-cross-sm"></em>
                      </a>
                    </td>
                  ) : null}
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        style={{ display: "table-cell" }}
                        className={
                          "datatable-cell nk-tb-col " + _cssArray[index]
                        }
                        {...cell.getCellProps()}
                      >
                        <span>
                          {
                            /* {Array.isArray(cell.value)
                            ? ((cell.value = cell.value[0]),
                              console.log("do you even runn", cell.value),
                              cell.render("Cell"))
                            : cell.render("Cell")} */

                            cell.render("Cell")
                          }
                        </span>
                      </td>
                    );
                  })}
                  {_rowActions && _rowActions.length > 0 && (
                    <div className="nk-tb-col nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-2">
                        <li>
                          <div className="dropdown">
                            {showRowActions && (
                              <a
                                href="#"
                                className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <em className="icon ni ni-more-h"></em>
                              </a>
                            )}
                            <div className="dropdown-menu dropdown-menu-right">
                              <ul className="link-list-opt no-bdr">
                                {_rowActions &&
                                  _rowActions.map(
                                    (action, index) =>
                                      action.show !== false && (
                                        <li key={index}>
                                          {action.externalLink ? (
                                            <a
                                              href={
                                                action.link +
                                                (action.property1
                                                  ? data[i][action.property1]
                                                  : " ")
                                              }
                                              target={action.target}
                                            >
                                              <em className={action.icon}></em>
                                              <span>{action.action}</span>
                                            </a>
                                          ) : (
                                            <Link
                                              to={
                                                action.link +
                                                (action.property1
                                                  ? action.queryLink
                                                    ? `?${action.property1}=${
                                                        data[i][
                                                          action.property1
                                                        ]
                                                      }`
                                                    : data[i][action.property1]
                                                  : " ")
                                              }
                                              target={action.target}
                                            >
                                              <em className={action.icon}></em>
                                              <span>{action.action}</span>
                                            </Link>
                                          )}
                                        </li>
                                      )
                                  )}
                                <li className="divider"></li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {hidePagination ||
      (_currentPage <= 1 && rows.length < _pageSize) ? null : reloadData ? (
        <div className="text-right">
          {_paginationStyle == 1 && (
            <div
              className="btn-group mt-4 "
              role="group"
              aria-label="Basic example"
            >
              {_currentPage <= 1 ? null : (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => __prevPage()}
                >
                  <i className="mdi mdi-arrow-left mr-1"></i>Previous page
                </button>
              )}
              {filteredRows.length <= 0 ? null : (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => __nextPage()}
                >
                  Next page <i className="mdi mdi-arrow-right ml-1"></i>
                </button>
              )}
            </div>
          )}

          {_paginationStyle == 2 && (
            <div className="card-inner">
              {paginationTemplate()}
              {/* .pagination */}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
