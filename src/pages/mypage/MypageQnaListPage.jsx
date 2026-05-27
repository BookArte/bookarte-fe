import MyPageQnaList from "@/components/mypage/MyPageQnaList";
import { useMyQnaList } from "@/hooks/domain/qna/useMyQnaList";

function MyPageQnaListPage() {

  const { data, status, handlers, getVirtualNumber } = useMyQnaList();

  return (
    <MyPageQnaList
      data={data}
      status={status}
      handlers={handlers}
      getVirtualNumber={getVirtualNumber}
    />
  );
}

export default MyPageQnaListPage;