import AdminNewsList from "@/components/news/AdminNewsList";
import { useNewsList } from "@/hooks/domain/news/useNewsList";

function AdminNewsPage() {

    const { data, status, handlers, getVirtualNumber } = useNewsList();

    return (
        <AdminNewsList
            data={data}
            status={status}
            handlers={handlers}
            getVirtualNumber={getVirtualNumber}
        />
    );
}

export default AdminNewsPage;