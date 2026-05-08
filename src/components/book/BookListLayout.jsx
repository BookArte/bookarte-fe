import Pagination from "../admin/Pagination";

const BookListLayout = ({
    title,
    data = [],
    handlers,
    pagination,
    status,
    searchBar,
    renderItem,
    customHeader
}) => {
    return (
        <div className="book-list-container">
            <h2>{title}</h2>

            {/* 검색바 영역 */}
            {searchBar}

            {/* 총 건수 및 헤더 */}
            <div className="list-header">
                {customHeader ? customHeader : (
                    <>전체 <strong>{status.totalElements}</strong> 건</>
                )}
            </div>

            {/* 도서 리스트 영역 */}
            <div className="book-list-wrapper">
                {data.length > 0 ? (
                    data.map((item, index) => renderItem(item, index))
                ) : (
                    <div className="no-data">조회된 도서가 없습니다.</div>
                )}
            </div>

            {/* 페이지네이션 */}
            {data.length > 0 && (
                <Pagination
                    pageGroupSize={pagination.pageGroupSize}
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    handlePageChange={pagination.handlePageChange}
                />
            )
            }
        </div>
    );

}

export default BookListLayout;

