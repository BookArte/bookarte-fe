import BoardWrite from "../admin/BoardWrite";
import AdminQnaForm from "./AdminQnaForm";

function AdminQnaModify({ formData, loading, handlers, refs }) {
    return (
        <BoardWrite title="Q&A 수정">
            <AdminQnaForm
                formData={formData}
                loading={loading}
                handlers={handlers}
                refs={refs}
                isEdit={true}
            />
        </BoardWrite>
    );
}

export default AdminQnaModify;