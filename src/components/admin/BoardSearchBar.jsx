const BoardSearchBar = ({ placeholder, handler, run = true }) => {
    return (
        <div className="filter-section">
            {run ? (
                <>
                    <input type="text" name="searchText" placeholder={placeholder} onChange={(e) => handler.handleChangeSearchParams(e.target)} />
                    <input type="date" name="searchStartDate" onChange={(e) => handler.handleChangeSearchParams(e.target)} /> ~ <input type="date" name="searchEndDate" onChange={(e) => handler.handleChangeSearchParams(e.target)} />
                    <button className="search-btn" onClick={handler.handleSearch}>
                        조회
                    </button>
                </>
            ) : (
                <>
                    <input type="text" placeholder={placeholder} />
                    <input type="date" name="searchStartDate" /> ~ <input type="date" name="searchEndDate" />
                    <button className="search-btn">
                        조회
                    </button>
                </>
            )}
        </div >
    );
};

export default BoardSearchBar;