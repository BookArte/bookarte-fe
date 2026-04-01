import AdminQnaList from "@/components/qna/AdminQnaList";
import { useQnaList } from "@/hooks/domain/qna/useQnaList";

function AdminQnaPage() {

    const { data, status, handlers, getVirtualNumber } = useQnaList();

    return (
        <AdminQnaList
            data={data}
            status={status}
            handlers={handlers}
            getVirtualNumber={getVirtualNumber}
        />
    );
}

export default AdminQnaPage;