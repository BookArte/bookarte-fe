import { Link } from 'react-router-dom';
import URL from '@/constants/url';
import { EMAIL_DOMAINS } from "@/constants/email";
import FindTab from './FindTab';

function FindPasswordForm({ isStepCode }) {

    if (isStepCode) {
        return (
            <div className='find-id-container'>
                <h2 className='find-id-title'>비밀번호 찾기</h2>

                <div className='code-verify-box'>
                    <p className='code-guide-text'>
                        이메일을 통해 전달드린 6자리 숫자 코드를 입력해주세요
                    </p>

                    <div className='code-input-wrapper'>
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                type='text'
                                maxLength={1}
                                className='code-square-input'
                            />
                        ))}
                    </div>

                    <button type='button' className='code-next-btn'>
                        <span>→</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='find-id-container'>
            <h2 className='find-id-title'>비밀번호 찾기</h2>
            <FindTab />
            <form className='find-id-form'>
                <div className='form-group'>
                    <input type='text' className='find-id-input' placeholder='아이디' />
                </div>
                <div className='form-group'>
                    <input type='text' className='find-id-input' placeholder='이름' />
                </div>
                <div className='form-group email-group'>
                    <input type='text' className='find-id-input email-input' placeholder='이메일' />
                    <span>@</span>
                    <input type='text' className='find-id-input email-input' placeholder='직접입력' />
                    <select className="find-id-input email-input">
                        <option value="">직접입력</option>
                        {EMAIL_DOMAINS.map(domain => (
                            <option key={domain} value={domain}>{domain}</option>
                        ))}
                    </select>
                </div>
                <button type='button' className='find-id-button'>확인</button>
                <div className='login-links'>
                    <Link to={URL.MEMBER_LOGIN} className='login-link'>로그인</Link>
                    <Link to={URL.MEMBER_AGREEMENT} className='join-link'>회원가입</Link>
                </div>
            </form>
        </div>
    );
}

export default FindPasswordForm;