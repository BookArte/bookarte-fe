import NewArrivalsList from "../../components/book/NewArrivalsList";
import { useNewArrivalsList } from "../../hooks/domain/book/useNewArrivalsList";

function NewArrivalsListPage() {
    const { arrivals, handlers, pagination, status } = useNewArrivalsList();

    return (
        <NewArrivalsList
            arrivals={arrivals}
            handlers={handlers}
            pagination={pagination}
            status={status}
        />
    );
}

export default NewArrivalsListPage;