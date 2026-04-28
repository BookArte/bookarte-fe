import { useNewsList } from "@/hooks/domain/news/useNewsList";
import NewsList from "@/components/news/NewsList";

function NewsListPage() {

    const {
        data,
        status,
        handlers,
        getVirtualNumber
    } = useNewsList();

    return (
        <NewsList
            data={data}
            status={status}
            handlers={handlers}
            getVirtualNumber={getVirtualNumber}
        />
    );
}

export default NewsListPage;