const Pagination = ({ pageGroupSize = 5, currentPage, totalPages, handlePageChange }) => {

    const startPage = Math.floor(currentPage / pageGroupSize) * pageGroupSize;
    const endPage = Math.min(startPage + pageGroupSize, totalPages);

    return (
        <div className="pagination">
            <button className="page-nav-btn" disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>이전</button>
            {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map(idx => (
                <button key={idx} className={`page-num-btn ${currentPage === idx ? 'active' : ''}`} onClick={() => handlePageChange(idx)}>
                    {idx + 1}
                </button>
            ))}
            <button className="page-nav-btn" disabled={currentPage >= totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>다음</button>
        </div>
    );
};

export default Pagination;