import BoardListLayout from "../common/BoardListLayout";
import news_default from '@/assets/images/news_default.png';

function NewsList({
    data,
    status,
    handlers,
    getVirtualNumber
}) {

    const renderGrid = (item, index) => {
        return (
            <>
                <div key={item.id} className="board-card" onClick={() => { handlers.handleView(item.id) }}>
                    <img src={item.thumbnailPath || `${news_default}`} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
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
            renderGrid={(item, index) => renderGrid(item, index)}
            isGrid={true}
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