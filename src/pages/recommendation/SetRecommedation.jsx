import BookSearchModal from '../../components/modals/BookSearchModal';
import RecommendationForm from '../../components/recommendation/RecommendationForm';
import { useRecommendation } from '@/hooks/domain/recommendation/useRecommendation';
import { useModal } from '@/hooks/domain/useModal';


function SetRecommedation() {

    const { isOpen, openModal, closeModal } = useModal();
    const useRecomendation = useRecommendation(closeModal);

    return (
        <>
            <RecommendationForm
                {...useRecomendation}
                openModal={openModal}
            />

            {/* 도서 검색 모달 */}
            <BookSearchModal
                isOpen={isOpen}
                onSelect={useRecomendation.handlers.handleSelectBook}
                onClose={closeModal}
            />
        </>
    )

}

export default SetRecommedation;