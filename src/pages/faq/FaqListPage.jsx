import { useFaqList } from "@/hooks/domain/faq/useFaqList";
import FaqList from "@/components/faq/FaqList";

function FaqListPage() {

    const {
        data,
        status,
        handlers,
        getVirtualNumber
    } = useFaqList();

    return (
        <FaqList
            data={data}
            status={status}
            handlers={handlers}
            getVirtualNumber={getVirtualNumber}
        />
    );
}

export default FaqListPage;