import '../../css/page.css';
import LoginForm from '../../components/LoginForm';
import { useLogin } from '../../hooks/domain/useLogin';

function Login() {
    const login = useLogin();
    return (
        <LoginForm {...login} />
    )
}
export default Login;