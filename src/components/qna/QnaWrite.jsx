import QnaForm from "./QnaForm";

function QnaWrite({ formData, loading, handlers, refs }) {
    return (
        <div className="qna-write-container">
            <div className="contents-header">
                <h2 className="contents-title">QNA 질문하기</h2>
            </div>

            <QnaForm
                formData={formData}
                loading={loading}
                handlers={handlers}
                refs={refs}
            />
        </div>
    );
}

export default QnaWrite;