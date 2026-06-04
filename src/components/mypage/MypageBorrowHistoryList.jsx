import MypageListLayout from "./MypageListLayout";

function MypageBorrowHistoryList({ data, status, handlers, getVirtualNumber }) {
    const columns = [
        { label: "번호", width: "80px" },
        { label: "책 제목", width: "" },
        { label: "저자", width: "200px" },
        { label: "대출일", width: "120px" },
        { label: "반납일", width: "120px" }
    ]

    const renderRow = (item, index) => {
        return (
            <tr key={item.borrowId} onClick={() => handlers.handleView(item.bookId)} className="cursor-pointer">
                <td>{getVirtualNumber(index)}</td>
                <td className="text-left">{item.bookTitle}</td>
                <td>{item.bookAuthor} 지음 </td>
                <td>{item.borrowDate}</td>
                <td>{item.returnDate}</td>
            </tr>
        );
    }

    return (
        <div className="mypage-content-container">
            <div className="mypage-section-header">
                <div className="mypage-section-title-group">
                    <h2>대출내역</h2>
                    <p>회원님이 대출하신 책의 내역입니다.</p>
                </div>
            </div>
            <MypageListLayout
                columns={columns}
                data={data}
                emptyMessage="대출 내역이 없습니다."
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

export default MypageBorrowHistoryList;
