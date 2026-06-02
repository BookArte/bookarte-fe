import MypageQnaList from "@/components/mypage/MypageQnaList";
import { useMyQnaList } from "@/hooks/domain/qna/useMyQnaList";

function MypageQnaListPage() {

  const { data, status, handlers, getVirtualNumber } = useMyQnaList();

  return (
    <MypageQnaList
      data={data}
      status={status}
      handlers={handlers}
      getVirtualNumber={getVirtualNumber}
    />
  );
}

export default MypageQnaListPage;