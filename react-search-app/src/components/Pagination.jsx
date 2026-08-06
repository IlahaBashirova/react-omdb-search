function Pagination({ currentPage, totalPages, onPageChange, disabled }) {
  return (
    <div className="pagination">
      <button
        disabled={disabled || currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Geri
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button
        disabled={disabled || currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        İrəli
      </button>
    </div>
  );
}

export default Pagination;
