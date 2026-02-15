function PenaltyManagementForm({ state, users, searchId, setSearchId, penaltyData, handlers }) {
    const { selectedUser, selectedPenalty, setSelectedPenalty, releaseReason, setReleaseReason } = state;
    const { handleSearch, handleUserClick } = handlers;

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
                            {users.length > 0 ? (
                                users.map(user => (
                                    <li
                                        key={user.userId}
                                        className={`user_item ${state.selectedUser?.userId === user.userId ? 'active' : ''}`}
                                        onClick={() => handleUserClick(user)}
                                    >
                                        <span className="user_name">{user.name}</span>
                                        <span className="user_id">{user.userId}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="no_data">조회된 사용자가 없습니다.</li>
                            )}
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
                            <div className="field"><span>전화번호</span><p>{selectedUser ? "010-0000-0000" : ""}</p></div>
                            <div className="field"><span>이메일</span><p>{selectedUser ? "test@example.com" : ""}</p></div>
                        </div>
                    </article>

                    {/* 패널티 내역 목록 영역 */}
                    <article className="info_box">
                        <h3>패널티 내역 목록</h3>
                        <div className="penalty_list_container">
                            <ul className="penalty_scroll_list">
                                {selectedUser ? (
                                    penaltyData[selectedUser.id]?.map(p => (
                                        <li
                                            key={p.id}
                                            className={`${selectedPenalty?.id === p.id ? 'selected' : ''} ${p.status}`}
                                            onClick={() => setSelectedPenalty(p)}
                                        >
                                            <span className="status_indicator"></span>
                                            <span className="p_date">[{p.date}]</span> {p.content}
                                        </li>
                                    ))
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
                        <h3>패널티 내용 상세 정보</h3>

                        <div className="detail_contents_wrapper">
                            {/* 패널티상세 정보 */}
                            <div className="detail_info_grid">
                                <div className="field"><span>도서명</span><p>{selectedPenalty?.content || ""}</p></div>
                                <div className="field"><span>ISBN</span><p>{selectedPenalty?.isbn || ""}</p></div>
                                <div className="field"><span>연체기간</span><p>{selectedPenalty?.period || ""}</p></div>
                                <div className="field"><span>총 연체일수</span><p className="num_highlight">{selectedPenalty?.overdueDays ? `${selectedPenalty.overdueDays}일` : ""}</p></div>
                                <div className="field"><span>대출기간</span><p>{selectedPenalty ? "2026.01.02~2026.01.15" : ""}</p></div>
                                <div className="field"><span>최종 반납일</span><p>{selectedPenalty ? "2026.01.17" : ""}</p></div>
                                <div className="field"><span>패널티 기간</span><p>{selectedPenalty?.penaltyPeriod || ""}</p></div>
                                <div className="field"><span>해제 여부</span><p>{selectedPenalty ? (selectedPenalty.status === 'RELEASED' ? 'Y' : 'N') : ""}</p></div>
                            </div>

                            {/* 해제 사유 및 상태 관리 핸들링 버튼 */}
                            <div className="detail_action_zone">
                                <div className="reason_input_wrapper">
                                    <label>해제 사유 입력</label>
                                    <textarea
                                        value={selectedPenalty?.status === 'RELEASED' ? selectedPenalty.reason : releaseReason}
                                        onChange={(e) => setReleaseReason(e.target.value)}
                                        disabled={!selectedPenalty || selectedPenalty.status === 'RELEASED'}
                                        placeholder={selectedPenalty ? "해제/복구 사유를 상세히 입력하세요." : "항목을 먼저 선택해주세요."}
                                    />
                                </div>
                                <div className="detail_btns">
                                    <button className="btn_revoke" disabled={!selectedPenalty}>패널티 복구</button>
                                    <button className="btn_release" disabled={!selectedPenalty}>패널티 해제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
export default PenaltyManagementForm;