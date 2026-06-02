import MypageWishList from "../../components/mypage/MypageWishList";
import { useMyWishList } from "../../hooks/domain/wish/useMyWishList";

function MypageWishLisstytPage() {
    const { data, status, handlers, getVirtualNumber } = useMyWishList();

    return (
        <MypageWishList
            data={data}
            status={status}
            handlers={handlers}
            getVirtualNumber={getVirtualNumber}
        />
    );
}

export default MypageWishLisstytPage;