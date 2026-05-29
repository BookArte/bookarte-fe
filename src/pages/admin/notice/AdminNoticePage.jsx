import AdminNoticeList from "@/components/notice/AdminNoticeList";
import { useNoticeList } from "@/hooks/domain/notice/useNoticeList";

function AdminNoticePage() {

    const { data, status, handlers, getVirtualNumber } = useNoticeList();

    return (
        <AdminNoticeList
            data={data}
            status={status}
            handlers={handlers}
            getVirtualNumber={getVirtualNumber}
        />
    );
}

export default AdminNoticePage;