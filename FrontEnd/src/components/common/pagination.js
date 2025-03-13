const Pagiantion = ({ recordsPerPage, datalenght, totalRecords, totalPages, currentPage, maxVisibleButtons, onPageChanged }) => {
  const isInFirstPage = () => {
    return currentPage === 1;
  };
  const isInLastPage = () => {
    if (totalPages === 0) {
      return true;
    }
    return currentPage === totalPages;
  };

  const onClickPreviousPage = () => {
    onPageChanged(currentPage - 1);
  };

  const onClickPage = (page) => {
    onPageChanged(page);
  };

  const onClickNextPage = () => {
    onPageChanged(currentPage + 1);
  };

  const startPage = () => {
    if (currentPage === 1) {
      return 1;
    }
    // When on the last page
    if (totalPages < maxVisibleButtons) {
      return 1;
    }
    if (currentPage === totalPages) {
      return totalPages - maxVisibleButtons + 1;
    }
    // When in between
    return currentPage - 1;
  };

  const endPage = () => {
    if (totalPages === 0) {
      return 1;
    }
    if (totalPages < maxVisibleButtons) {
      return totalPages;
    }
    return Math.min(startPage() + maxVisibleButtons - 1, totalPages);
  };

  const isPageActive = (page) => {
    return currentPage === page;
  };

  var pages = [];
  for (let i = startPage(); i <= endPage(); i++) {
    pages.push(
      <li key={i} className="pagination-item">
        <button
          onClick={() => {
            onClickPage(i);
          }}
          className={isPageActive(i) ? "active" : ""}
        >
          {i}
        </button>
      </li>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-5">
          <span className="dataTables_info header-text" >Showing <strong>{((currentPage - 1) * recordsPerPage) + totalRecords===0? 0:1}</strong> to <strong>{(currentPage - 1) * recordsPerPage + datalenght}</strong> of <strong>{totalRecords}</strong> entries</span>
        </div>
        <div className="col-sm-12 col-md-7">
        <div className="dataTables_paginate paging_simple_numbers" id="students_table_paginate">
          <ul className="pagination">
            <li className="pagination-item">
              <button
                onClick={() => onClickPreviousPage()}
                className={isInFirstPage() || totalRecords===0 ? "disabled" : ""}
                disabled={isInFirstPage() || totalRecords===0}
              >
                Previous
              </button>
            </li>
            {pages}
            <li className="pagination-item">
              <button
                onClick={() => onClickNextPage()}
                className={isInLastPage() || totalRecords===0 ? "disabled" : ""}
                disabled={isInLastPage() || totalRecords===0}
              >
                Next
              </button>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagiantion;
