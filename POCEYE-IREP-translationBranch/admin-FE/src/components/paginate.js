import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Paginate({
  currentPage,
  pageSize,
  totalRecordsCount,
  onChange,
}) {
  const maxDisplayPage = 10;
  const [maxPage, setMaxPage] = useState(
    Math.ceil(totalRecordsCount / pageSize)
  );
  const [pages, setPages] = useState([]);
  const [_currentPage, set_CurrentPage] = useState(currentPage);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const _maxPage = Math.ceil(totalRecordsCount / pageSize);
    setMaxPage(_maxPage);

    let _pages = [];
    for (let i = 1; i <= _maxPage; i++) {
      if (i > maxDisplayPage) break;
      _pages.push(i);
    }

    if (_maxPage > maxDisplayPage) {
      if (maxDisplayPage + 1 != _maxPage) {
        _pages.push("...");
      }
      _pages.push(_maxPage);
    }

    setPages(_pages);
  }, [currentPage, pageSize, totalRecordsCount]);

  const paginate = (_page) => {
    if (_page == "...") return;
    if (_page < 1) return;
    if (_page > maxPage) return;

    set_CurrentPage(_page);
    onChange && onChange(_page);
  };

  return (
    <>
      <div className="nk-block-between-md g-3">
        <div className="g">
          <ul className="pagination">
            <li className="page-item">
              <button
                type="button"
                className="page-link"
                onClick={() => paginate(_currentPage - 1)}
              >
                {" "}
                {"<"} Prev
              </button>
            </li>
            {pages.map((_page) => (
              <li
                className={
                  _page === (_currentPage || currentPage)
                    ? "page-item active"
                    : "page-item"
                }
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => paginate(_page)}
                >
                  {" "}
                  {_page}
                </button>
              </li>
            ))}

            <li className="page-item">
              <button
                type="button"
                className="page-link"
                onClick={() => paginate(_currentPage + 1)}
              >
                {" "}
                Next {">"}{" "}
              </button>
            </li>
          </ul>
          {/* .pagination */}
        </div>

        <div className="g" data-select2-id={6}>
          <div
            className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3"
            data-select2-id={5}
          >
            <div style={{ width: "" }}>Go to Page:</div>
            <div>
              <input
                type="number"
                className="form-control border search-input text-align-center"
                placeholder=""
                onChange={(e) => {
                  paginate(e.target.value);
                  setSearchTerm(e.target.value);
                  set_CurrentPage(e.target.value);
                }}
                value={_currentPage}
                style={{ width: "50px" }}
              />
            </div>
            <div style={{ width: "" }}>of {`${maxPage}`}</div>
          </div>
        </div>
        {/* .pagination-goto */}
      </div>
    </>
  );
}
