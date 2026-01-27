import FindPasswordForm from "@/components/FindPasswordForm";
import { useFindPassword } from '@/hooks/domain/useFindPassword';

function FindPassword() {
    const findPwProps = useFindPassword();

    return (
        <FindPasswordForm {...findPwProps} />
    );
}

export default FindPassword;