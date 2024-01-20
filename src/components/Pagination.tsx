import React, { ChangeEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface PaginationProps {
  activePage: number;
  totalPages: number;
  pageRange: number;
}

const Pagination = ({ activePage, totalPages, pageRange }: PaginationProps) => {
  const navigate = useNavigate();
  
  const getPageNumbersDesktop = () => {
    const pageNumbers = [];
    pageNumbers.push(1);
    if (activePage > pageRange + 2) {
      pageNumbers.push('...');
    }
    for (let i = Math.max(2, activePage - pageRange); i <= Math.min(totalPages, activePage + pageRange); i++) {
      pageNumbers.push(i);
    }
    if (totalPages - activePage > pageRange + 1) {
      pageNumbers.push('...');
    }
    if (pageNumbers[pageNumbers.length - 1] != totalPages) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const getPageNumbersMobile = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleDropdownChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedPage = parseInt(event.target.value, 10);
    if (!isNaN(selectedPage) && selectedPage !== activePage) {
      navigate(`/?page=${selectedPage}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center">
      {activePage != 1 && <Link to={`/?page=${activePage-1}`} className='px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold'>
        Previous
      </Link> }

      <div className='lg:hidden'>
        <div className="">
          <select
            value={activePage} onChange={handleDropdownChange}
            className="h-full w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal focus:border-gray-900"
          >
            {getPageNumbersMobile().map((pageNumber, index) => (
              <option key={index} value={pageNumber}>
                Page {pageNumber}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='hidden lg:flex flex-wrap gap-2 items-center'>
        {getPageNumbersDesktop().map((pageNumber, index) => (
          <React.Fragment key={index}>
            {pageNumber === '...' ? (
              <div className="px-3 py-2">...</div>
            ) : (
              <Link to={`/?page=${pageNumber}`} key={pageNumber} className={`px-3 py-2 border ${pageNumber == activePage ? 'bg-gray-300' : 'border-gray-300'}`}>
                <p>{pageNumber}</p>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>

      {activePage != totalPages && <Link to={`/?page=${activePage+1}`} className='px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold'>
        Next
      </Link>}
    </div>
  );
};

export default Pagination;
