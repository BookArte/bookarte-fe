import BoardWrite from "../admin/BoardWrite";
import BoardForm from "../admin/BoardForm";

function AdminFaqModify({ formData, loading, handlers, refs }) {
    return (
        <BoardWrite title="FAQ 수정">
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

export default AdminFaqModify;