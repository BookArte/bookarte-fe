import AdminFaqList from "@/components/faq/AdminFaqList";
import { useFaqList } from "@/hooks/domain/faq/useFaqList";

function AdminFaqPage() {

    const { data, status, handlers, getVirtualNumber } = useFaqList();

    return (
        <AdminFaqList
            data={data}
            status={status}
            handlers={handlers}
            getVirtualNumber={getVirtualNumber}
        />
    );
}

export default AdminFaqPage;