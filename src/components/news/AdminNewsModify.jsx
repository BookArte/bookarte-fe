import BoardWrite from "../admin/BoardWrite";
import BoardForm from "../admin/BoardForm";

function AdminNewsModify({ formData, loading, handlers, refs }) {
    return (
        <BoardWrite title="뉴스 수정">
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

export default AdminNewsModify;