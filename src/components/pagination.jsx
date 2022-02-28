import React from "react";
import _ from "lodash";

const Pagination = ({ count, pageSize, onPageChange, currentPage }) => {
  const totalPages = count / pageSize;
  const pagination = _.range(1, totalPages + 1);

  //const test22 = _.range(1, 5); [1,2,3,4]
  let num = 20;
  let start = currentPage - 10;
  let end = currentPage + 10;

  for (let i = 0; i < 22; i++) {
    if (start < 1) {
      start++;
      end++;
    }
    if (end > pagination.length) {
      end--;
      start--;
    }
  }

  let limitedPag = _.range(start, end);

  return (
    <nav
      className="d-flex justify-content-center"
      aria-label="Page navigation example"
    >
      <ul className="pagination">
        {limitedPag.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
