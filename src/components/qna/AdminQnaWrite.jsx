import BoardWrite from "../admin/BoardWrite";
import AdminQnaForm from "./AdminQnaForm";

function AdminQnaWrite({ formData, loading, handlers, refs }) {
    return (
        <BoardWrite title="Q&A 작성">
            <AdminQnaForm
                formData={formData}
                loading={loading}
                handlers={handlers}
                refs={refs}
            />
        </BoardWrite>
    );
}

export default AdminQnaWrite;