import FindPasswordForm from "@/components/member/FindPasswordForm";
import { useFindPassword } from '@/hooks/domain/member/useFindPassword';

function FindPassword() {
    const findPwProps = useFindPassword();

    return (
        <FindPasswordForm {...findPwProps} />
    );
}

export default FindPassword;