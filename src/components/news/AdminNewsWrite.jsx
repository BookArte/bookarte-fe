import BoardWrite from "../admin/BoardWrite";
import BoardForm from "../admin/BoardForm";

function AdminNewsWrite({ formData, loading, handlers, refs }) {
    return (
        <BoardWrite title="뉴스 작성">
            <BoardForm
                formData={formData}
                loading={loading}
                handlers={handlers}
                refs={refs}
            />
        </BoardWrite>
    );
}

export default AdminNewsWrite;