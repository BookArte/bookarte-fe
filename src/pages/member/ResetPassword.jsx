import { useLocation } from "react-router-dom";
import ResetPasswordForm from "../../components/ResetPasswordForm";

function ResetPassword() {
    const location = useLocation();

    return (
        <ResetPasswordForm />
    )
}

export default ResetPassword;