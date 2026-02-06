import { useResetPassword } from "@/hooks/domain/useResetPassword";
import ResetPasswordForm from "@/components/member/ResetPasswordForm";

function ResetPassword() {
    const resetPwProps = useResetPassword();

    return (
        <ResetPasswordForm {...resetPwProps} />
    )
}

export default ResetPassword;