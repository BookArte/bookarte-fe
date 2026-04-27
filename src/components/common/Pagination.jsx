const Pagination = ({ pageGroupSize = 5, currentPage, totalPages, handlePageChange }) => {

    const startPage = Math.floor(currentPage / pageGroupSize) * pageGroupSize;
    const endPage = Math.min(startPage + pageGroupSize, totalPages);

    return (
        <div className="common-pagination">
            <button className="page-prev" disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>이전</button>
            {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map(idx => (
                <button key={idx} className={`page-num ${currentPage === idx ? 'is-active' : ''}`} onClick={() => handlePageChange(idx)}>
                    {idx + 1}
                </button>
            ))}
            <button className="page-next" disabled={currentPage >= totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>다음</button>
        </div>
    );
};

export default Pagination;