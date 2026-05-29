import { useResetPassword } from "@/hooks/domain/member/useResetPassword";
import ResetPasswordForm from "@/components/member/ResetPasswordForm";

function ResetPassword() {
    const resetPwProps = useResetPassword();

    return (
        <ResetPasswordForm {...resetPwProps} />
    )
}

export default ResetPassword;