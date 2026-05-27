import MypageInfoForm from '@/components/mypage/MypageInfoForm';
import { useOutletContext } from 'react-router-dom';
import { useMypageInfo } from '@/hooks/domain/mypage/useMypageInfo';
import { usePasswordChange } from '@/hooks/domain/mypage/usePasswordChange';
import PasswordChangeModal from '@/components/modals/PasswordChangeModal';
import { useModal } from '@/hooks/domain/useModal';
import { useWithdrawal } from '@/hooks/domain/member/useWithdrawal';
import WithdrawalModal from '@/components/modals/WithdrawalModal';

function MypageInfo() {
    const { userData, refetch } = useOutletContext();
    const MypageInfoProps = useMypageInfo(userData, refetch);

    const {
        isOpen: isPwOpen,
        openModal: openPwModal,
        closeModal: closePwModal
    } = useModal();
    const passwordProps = usePasswordChange(closePwModal);

    const {
        isOpen: isWithdrawOpen,
        openModal: openWithdrawModal,
        closeModal: closeWithdrawModal
    } = useModal();
    const withdrawalProps = useWithdrawal(closeWithdrawModal);

    return (
        <>
            <MypageInfoForm
                {...MypageInfoProps}
                handlers={{
                    ...MypageInfoProps.handlers,
                    onOpenPasswordModal: () => {
                        passwordProps.handlers.resetForm();
                        openPwModal();
                    },
                    onOpenWithdrawalModal: () => {
                        withdrawalProps.handlers.resetForm();
                        openWithdrawModal();
                    }
                }}
            />

            <PasswordChangeModal
                isOpen={isPwOpen}
                onClose={closePwModal}
                formData={passwordProps.formData}
                handlers={passwordProps.handlers}
                status={passwordProps.status}
            />

            <WithdrawalModal
                isOpen={isWithdrawOpen}
                onClose={closeWithdrawModal}
                formData={withdrawalProps.formData}
                handlers={withdrawalProps.handlers}
                status={withdrawalProps.status}
            />
        </>
    );
}

export default MypageInfo;