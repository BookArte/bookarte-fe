import MypageListLayout from "./MypageListLayout";

function MypageWishList({ data, status, handlers, getVirtualNumber }) {
    const columns = [
        { label: "번호", width: "80px" },
        { label: "책 제목", width: "" },
        { label: "저자", width: "200px" },
        { label: "출판사", width: "200px" },
    ]

    const renderRow = (item, index) => {
        return (
            <tr key={item.wishId} onClick={() => handlers.handleView(item.bookId)} className="cursor-pointer">
                <td>{getVirtualNumber(index)}</td>
                <td className="text-left">{item.bookTitle}</td>
                <td>{item.bookAuthor} 지음 </td>
            </tr>
        );
    }

    return (
        <div className="mypage-content-container">
            <div className="mypage-section-header">
                <div className="mypage-section-title-group">
                    <h2>관심 도서</h2>
                    <p>회원님이 관심 등록하신 책의 내역입니다.</p>
                </div>
            </div>
            <MypageListLayout
                columns={columns}
                data={data}
                emptyMessage="관심 도서가 없습니다."
                renderRow={(item, index) => renderRow(item, index)}
                pagination={{
                    pageGroupSize: status.pageGroupSize,
                    currentPage: status.currentPage,
                    totalPages: status.totalPages,
                    handlePageChange: handlers.handlePageChange
                }}
            />
        </div>
    );

}

export default MypageWishList;