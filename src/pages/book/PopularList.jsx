import PoplarListView from "../../components/book/PopularListView";
import { usePopularList } from "../../hooks/domain/book/popluar/usePopularList";


function PopularList() {
    return < PoplarListView {...usePopularList()} />;
}
export default PopularList;