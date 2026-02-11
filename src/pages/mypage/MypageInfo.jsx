import MypageInfoForm from '@/components/mypage/MypageInfoForm';
import { useOutletContext } from 'react-router-dom';
import { useMypageInfo } from '@/hooks/domain/mypage/useMypageInfo';
import { usePasswordChange } from '@/hooks/domain/mypage/usePasswordChange';
import PasswordChangeModal from '@/components/modals/PasswordChangeModal';
import { useModal } from '@/hooks/domain/useModal';

function MypageInfo() {
    const { userData, refetch } = useOutletContext();
    const MypageInfoProps = useMypageInfo(userData, refetch);

    const { isOpen, openModal, closeModal } = useModal();

    const passwordProps = usePasswordChange(closeModal);

    return (
        <>
            <MypageInfoForm
                {...MypageInfoProps}
                handlers={{
                    ...MypageInfoProps.handlers,
                    onOpenPasswordModal: () => {
                        passwordProps.handlers.resetForm();
                        openModal();
                    }
                }}
            />

            <PasswordChangeModal
                isOpen={isOpen}
                onClose={closeModal}
                formData={passwordProps.formData}
                handlers={passwordProps.handlers}
                status={passwordProps.status}
            />
        </>
    );
}

export default MypageInfo;