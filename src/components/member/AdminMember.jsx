function AdminMember({ state, users, searchId, setSearchId, fetchUsers, penaltys, borrows, handlers, loading }) {
    const { selectedUser, selectedBorrow, setSelectedBorrow, releaseReason, setReleaseReason, lastUserElementRef } = state;
    const { handleSearch, handleUserClick, hanadleRevokePenalty, handleExpelMember } = handlers;

    return (
        <div className="penalty_main">
            {/* 좌측 유저 목록 사이드 바 */}
            <aside className="user_sidebar">
                <div className="sidebar_inner">
                    {/* 검색 영역 */}
                    <div className="search_area">
                        <div className="search_input_wrapper">
                            <input
                                type="text"
                                placeholder="사용자 조회"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                            />
                            <button className="btn_search" onClick={handleSearch}>조회</button>
                        </div>
                    </div>

                    {/* 유저 리스트 */}
                    <div className="user_list_container">
                        <h3 className="list_title">사용자 목록</h3>
                        <ul className="user_list">
                            {users.map((user, index) => {
                                const isLastElement = users.length === index + 1;
                                return (
                                    <li
                                        key={user.id}
                                        className={`user_item ${selectedUser?.id === user.id ? 'active' : ''}`}
                                        onClick={() => handleUserClick(user)}
                                    >
                                        <span className="user_name">{user.name}</span>
                                        <span className="user_id">{user.userId}</span>
                                    </li>
                                );
                            })}

                            {/* 로딩 표시기 */}
                            {loading && <li className="loading_msg">데이터 불러오는 중...</li>}

                            {/* 데이터가 아예 없는 경우 */}
                            {!loading && users.length === 0 && <li className="no_data">조회된 사용자가 없습니다.</li>}

                            <div ref={lastUserElementRef} style={{ height: '10px' }} />
                        </ul>
                    </div>
                </div>
            </aside>

            {/* 상단 영역 */}
            <main className="main_contents">
                <section className="top_info_row">
                    {/* 유저 정보 영역  */}
                    <article className="info_box">
                        <h3>유저 정보</h3>
                        <div className="info_fields">
                            <div className="field"><span>사용자명</span><p>{selectedUser?.name || ""}</p></div>
                            <div className="field"><span>아이디</span><p>{selectedUser?.userId || ""}</p></div>
                            <div className="field"><span>전화번호</span><p>{selectedUser?.tel || ""}</p></div>
                            <div className="field"><span>이메일</span><p>{selectedUser?.email || ""}</p></div>
                            <div className="field"><span>탈퇴여부</span><p>{selectedUser?.withdrawal || ""}</p></div>
                        </div>
                        <div className="detail_btns">
                            <button className="btn_red" onClick={() => handleExpelMember(selectedUser.id)}>회원 추방</button>
                        </div>
                    </article>

                    <article className="info_box">
                        <h3>대출 목록</h3>
                        <div className="penalty_list_container">
                            <ul className="penalty_scroll_list">
                                {selectedUser ? (
                                    borrows.length > 0 ? (
                                        borrows.map((borrow, index) => (
                                            <li
                                                key={index}
                                                className={`${selectedBorrow === borrow ? 'selected' : ''} ${borrow.status === 'RETURNED' ? 'RELEASED' : 'ACTIVE'}`}
                                                onClick={() => setSelectedBorrow(borrow)}
                                            >
                                                <span className="status_indicator"></span>
                                                {borrow.bookTitle} <span className="p_date">[{borrow.borrowDate} ~ {borrow.returnDueDate}]</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="no_data">대출 내역이 없습니다.</li>
                                    )
                                ) : (
                                    <li className="no_data">유저를 선택하면 내역이 표시됩니다.</li>
                                )}
                            </ul>
                        </div>
                    </article>
                </section>
                {/* 하단 영역 */}
                <section className="bottom_detail_container">
                    <div className="info_box detail_main_box">
                        <h3>대출 상세 정보</h3>

                        <div className="detail_contents_wrapper">
                            {/* 패널티상세 정보 */}
                            <div className="detail_info_grid">
                                <div className="field"><span>도서제목</span><p>{selectedBorrow?.bookTitle || ""}</p></div><br />
                                <div className="field"><span>연체여부</span><p>{selectedBorrow?.overdue ? "연체 중" : ""}</p></div>
                                <div className="field"><span>총 연체일수</span><p className="num_highlight">{selectedBorrow?.overdueDays ? `${selectedBorrow.overdueDays}일` : ""}</p></div>
                                <div className="field"><span>대출기간</span><p>{selectedBorrow ? `${selectedBorrow.borrowDate} ~ ${selectedBorrow.returnDueDate}` : ""}</p></div>
                                <div className="field"><span>최종 반납일</span><p>{selectedBorrow?.returnDate || ""}</p></div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
export default AdminMember;