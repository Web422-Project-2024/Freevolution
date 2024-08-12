import React from 'react';
import styles from '@/styles/Pagination.module.css';

export default function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxVisibleButtons = 5;
  let startPage, endPage;

  if (pageNumbers.length <= maxVisibleButtons) {
    startPage = 1;
    endPage = pageNumbers.length;
  } else {
    if (currentPage <= Math.floor(maxVisibleButtons / 2) + 1) {
      startPage = 1;
      endPage = maxVisibleButtons;
    } else if (currentPage + Math.floor(maxVisibleButtons / 2) >= pageNumbers.length) {
      startPage = pageNumbers.length - maxVisibleButtons + 1;
      endPage = pageNumbers.length;
    } else {
      startPage = currentPage - Math.floor(maxVisibleButtons / 2);
      endPage = currentPage + Math.floor(maxVisibleButtons / 2);
    }
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        <li>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className={styles.navButton}
          >
            Prev
          </button>
        </li>
        
        {startPage > 1 && (
          <>
            <li><button onClick={() => paginate(1)}>1</button></li>
            {startPage > 2 && <li className={styles.ellipsis}>...</li>}
          </>
        )}

        {pageNumbers.slice(startPage - 1, endPage).map(number => (
          <li key={number} className={currentPage === number ? styles.active : ''}>
            <button onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}

        {endPage < pageNumbers.length && (
          <>
            {endPage < pageNumbers.length - 1 && <li className={styles.ellipsis}>...</li>}
            <li><button onClick={() => paginate(pageNumbers.length)}>{pageNumbers.length}</button></li>
          </>
        )}

        <li>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === pageNumbers.length}
            className={styles.navButton}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
