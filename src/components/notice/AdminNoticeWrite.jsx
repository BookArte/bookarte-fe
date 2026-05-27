import BoardWrite from "../admin/BoardWrite";
import BoardForm from "../admin/BoardForm";

function AdminNoticeWrite({ formData, loading, handlers, refs }) {
    return (
        <BoardWrite title="공지사항 작성">
            <BoardForm
                formData={formData}
                loading={loading}
                handlers={handlers}
                refs={refs}
                thumbnail={false}
            />
        </BoardWrite>
    );
}

export default AdminNoticeWrite;