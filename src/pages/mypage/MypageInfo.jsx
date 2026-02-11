import MypageInfoForm from '@/components/mypage/MypageInfoForm';
import { useOutletContext } from 'react-router-dom';
import { useMypageInfo } from '@/hooks/domain/mypage/useMypageInfo';
import { usePasswordChange } from '@/hooks/domain/mypage/usePasswordChange';
import PasswordChangeModal from '@/components/modals/PasswordChangeModal';

function MypageInfo() {

    const { userData, refetch } = useOutletContext();
    const MypageInfoProps = useMypageInfo(userData, refetch);
    const passwordProps = usePasswordChange();

    return (
        <>
            <MypageInfoForm
                {...MypageInfoProps}
                handlers={{
                    ...MypageInfoProps.handlers,
                    onOpenPasswordModal: passwordProps.handlers.openModal
                }}
            />

            <PasswordChangeModal
                isOpen={passwordProps.isOpen}
                onClose={passwordProps.handlers.closeModal}
                formData={passwordProps.formData}
                handlers={passwordProps.handlers}
                status={passwordProps.status}
            />
        </>
    );
}

export default MypageInfo;