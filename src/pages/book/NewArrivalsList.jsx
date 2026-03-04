import NewArrivalsListView from "../../components/book/NewArrivalsListView";
import { useNewArrivalsList } from "../../hooks/domain/book/useNewArrivalsList";

function NewArrivalsList() {
    return <NewArrivalsListView {...useNewArrivalsList()} />
}

export default NewArrivalsList;