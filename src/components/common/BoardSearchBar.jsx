const BoardSearchBar = ({ handler, run = true }) => {
    return (
        <div className="search-filter-box">
            {run ? (
                <>
                    <input type="text" name="searchText" placeholder="제목 또는 내용을 입력하세요" className="search-input" onChange={(e) => handler.handleChangeSearchParams(e.target)} />
                    <button type="button" className="search-submit-btn" onClick={handler.handleSearch}>검색</button>
                </>
            ) : (
                <>
                    <input type="text" placeholder="제목 또는 내용을 입력하세요" className="search-input" />
                    <button type="button" className="search-submit-btn">검색</button>
                </>
            )}
        </div >
    );
};

export default BoardSearchBar;






