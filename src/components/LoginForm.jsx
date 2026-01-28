import URL from '@/constants/url';
import { Link } from 'react-router-dom';

function LoginForm({
    form,
    handlers,
    status
}) {
    const {
        handleChange,
        submitFormHandler
    } = handlers;
    const {
        isSubmitting
    } = status;

    return (
        <div className='login-container'>
            <h2 className='login-title'>로그인</h2>
            <form className='login-form'>
                <div className='form-group'>
                    <input
                        type='text'
                        name='memberUserId'
                        className='login-input'
                        value={form.memberUserId}
                        onChange={handleChange}
                        placeholder='아이디'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        name='memberPassword'
                        className='login-input'
                        value={form.memberPassword}
                        onChange={handleChange}
                        placeholder='비밀번호'
                        required
                    />
                </div>
                <button
                    type='button'
                    onClick={submitFormHandler}
                    className='login-button'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '로그인 중...' : '로그인'}
                </button>
                <div className='login-links'>
                    <Link to={URL.MEMBER_AGREEMENT} className='join-link'>회원가입</Link>
                    <Link to={URL.MEMBER_FIND_ID} className='find-id-link'>아이디/비밀번호 찾기</Link>
                </div>
            </form>
        </div>
    );
}
export default LoginForm;