import { useNavigate } from 'react-router-dom';

function BoardDetailLayout({
    title,
    date,
    content,
    files = [],
}) {
    const navigate = useNavigate();

    return (
        <div className="board-detail-user-container">
            <div className="detail-header">
                <h3 className="detail-title">{title}</h3>
                <div className="detail-info">
                    <dl>
                        <dt>작성일</dt>
                        <dd>{date}</dd>
                    </dl>
                </div>
            </div>

            {files.length > 0 && (
                <div className="detail-files">
                    <span className="file-label">첨부파일</span>
                    <ul className="file-list">
                        {files.map((file, idx) => (
                            <li key={idx}>
                                <a href={file.url} download className="file-link">
                                    {file.name} <span className="file-size"></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="detail-content">
                <div
                    className="content-inner"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>

            <div className="detail-footer">
                <button
                    type="button"
                    className="btn-list-go"
                    onClick={() => navigate(-1)}
                >
                    목록으로
                </button>
            </div>
        </div>
    );
}

export default BoardDetailLayout;