import { useRecommendationList } from '@/hooks/domain/recommendation/useRecommendationList';
import Main from '@/components/main/Main';
import MainRecommend from '@/components/main/MainRecommend';
import MainBoard from '@/components/main/MainBoard';
import { useMainBoard } from '@/hooks/domain/main/useMainBoard';

function MainPage() {
  const { books, loading, handleViewBook } = useRecommendationList();
  const { currentList, boardLoading, activeTab, setActiveTab, handleView } = useMainBoard();

  return (
    <Main
      mainRecommend=
      {<MainRecommend
        books={books}
        loading={loading}
        handleViewBook={handleViewBook}
      />}
      mainBoard={
        <MainBoard
          currentList={currentList}
          loading={boardLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleView={handleView}
        />
      }
    />
  );
};

export default MainPage;
