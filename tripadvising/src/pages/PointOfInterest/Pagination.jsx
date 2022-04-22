import React, { useState, useEffect } from "react";

const Pagination = ({ count, setOffset, children }) => {
  const [pages] = useState(Math.round(count / 12));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
    setOffset(currentPage * 12 - 12);
  }, [currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginationGroup = () => {
    if (pages === 0) return [1];
    let start = Math.floor((currentPage - 1) / 5) * 5;
    if (pages < 5)
      return new Array(pages).fill().map((_, idx) => start + idx + 1);
    return new Array(5).fill().map((_, idx) => start + idx + 1);
  };

  const content = (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : null}`}>
          <button className="page-link" onClick={goToPreviousPage}>
            Previous
          </button>
        </li>
        {getPaginationGroup().map((item, index) => (
          <li className="page-item" key={index}>
            <button onClick={changePage} className={`page-link`}>
              <span>{item}</span>
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === pages || currentPage - 1 === pages
              ? "disabled"
              : null
          }`}
        >
          <button className="page-link" onClick={goToNextPage}>
            next
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <React.Fragment>
      {content && content}
      {children}
      {content && content}
    </React.Fragment>
  );
};

export default Pagination;
