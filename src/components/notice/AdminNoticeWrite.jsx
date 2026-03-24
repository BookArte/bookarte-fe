import BoardWrite from "../admin/BoardWrite";
import BoardWriteForm from "../admin/BoardWriteForm";

function AdminNoticeWrite({ formData, loading, handlers, refs }) {
    return (
        <BoardWrite title="공지사항 작성">
            <BoardWriteForm
                formData={formData}
                loading={loading}
                handlers={handlers}
                refs={refs}
            />
        </BoardWrite>
    );
}

export default AdminNoticeWrite;