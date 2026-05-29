import BoardWrite from "../admin/BoardWrite";
import BoardForm from "../admin/BoardForm";

function AdminFaqWrite({ formData, loading, handlers, refs }) {
    return (
        <BoardWrite title="FAQ 작성">
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

export default AdminFaqWrite;