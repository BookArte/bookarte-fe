import BoardWrite from "../admin/BoardWrite";
import BoardForm from "../admin/BoardForm";

function AdminNoticeModify({ formData, loading, handlers, refs }) {
    return (
        <BoardWrite title="공지사항 수정">
            <BoardForm
                formData={formData}
                loading={loading}
                handlers={handlers}
                refs={refs}
                isEdit={true}
            />
        </BoardWrite>
    );
}

export default AdminNoticeModify;