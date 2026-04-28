import { useNoticeList } from "@/hooks/domain/notice/useNoticeList";
import NoticeList from "@/components/notice/NoticeList";

function NoticeListPage() {

    const {
        data,
        status,
        handlers,
        getVirtualNumber
    } = useNoticeList();

    return (
        <NoticeList
            data={data}
            status={status}
            handlers={handlers}
            getVirtualNumber={getVirtualNumber}
        />
    );
}

export default NoticeListPage;