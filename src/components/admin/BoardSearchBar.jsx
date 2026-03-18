const BoardSearchBar = ({placeholder}) => {
    return (
        <div className="filter-section">
            <input type="text" placeholder={placeholder} />
            <input type="date" name="searchStartDate" /> ~ <input type="date" name="searchEndDate" />
            <button className="search-btn">조회</button>
        </div>
    );
};

export default BoardSearchBar;