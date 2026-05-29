import WishListView from "../../components/wish/WishListView";
import { useMyWishList } from "../../hooks/domain/wish/useMyWishList";

function MyWishList() {
    return <WishListView {...useMyWishList()} />
}

export default MyWishList;