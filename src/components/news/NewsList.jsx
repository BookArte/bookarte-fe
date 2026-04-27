import BoardListLayout from "../common/BoardListLayout";

function NewsList({
    data,
    status,
    handlers,
    getVirtualNumber
}) {

    const renderRow = (item, index) => {
        return (
            <>
                <tr className={`${item.noticeYn === 'Y' ? 'is-notice' : ''}`}>
                    <td>{item.noticeYn === 'Y' ? '공지' : getVirtualNumber(index)}</td>
                    <td className="text-left"><a onClick={() => { handlers.handleView(item.id) }}>{item.title}</a></td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
            </>
        );
    };

    return (
        <BoardListLayout
            title="뉴스"
            columns={[
                { label: "번호", width: "80px" },
                { label: "제목", width: "auto" },
                { label: "작성일", width: "120px" }
            ]}
            data={data}
            renderRow={(item, index) => renderRow(item, index)}
            selection={{
                handleChangeSearchParams: handlers.handleChangeSearchParams,
                handleSearch: handlers.handleSearch
            }}
            pagination={{
                currentPage: status.currentPage,
                totalPages: status.totalPages,
                handlePageChange: handlers.handlePageChange,
                total: status.total
            }}
        />
    );
}

export default NewsList;