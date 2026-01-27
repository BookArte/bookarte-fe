import { Link } from 'react-router-dom';
import URL from '@/constants/url';
import { EMAIL_DOMAINS } from "@/constants/email";
import FindTab from './FindTab';

function FindPasswordForm({ isStepCode, form, codes, inputRefs, handlers, status, timeLeft, formatTime }) {
    const { handleInput, selectEmailDomain, submitFindPasswordHandler, handleCodeChange, submitCodeHandler, handlePaste } = handlers;

    if (isStepCode) {
        return (
            <div className='find-password-container'>
                <h2 className='find-password-title'>비밀번호 찾기</h2>
                <div className='code-verify-box'>
                    <p className='code-guide-text'>
                        이메일을 통해 전달드린 6자리 숫자 코드를 입력해주세요
                    </p>
                    <div className={`code-timer ${timeLeft <= 60 ? 'warning' : ''}`}>
                        남은 시간 {formatTime(timeLeft)}
                    </div>
                    <div className='code-input-wrapper'>
                        {codes.map((code, i) => (
                            <input
                                key={i}
                                type='text'
                                maxLength={1}
                                className='code-square-input'
                                value={code}
                                ref={el => inputRefs.current[i] = el}
                                onChange={(e) => handleCodeChange(i, e.target.value)}
                                onPaste={handlePaste}
                            />
                        ))}
                    </div>
                    <button type='button' className='code-next-btn' onClick={submitCodeHandler}>
                        <span>→</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='find-password-container'>
            <h2 className='find-password-title'>비밀번호 찾기</h2>
            <FindTab />
            <form className='find-password-form'>
                <div className='form-group'>
                    <input type='text'
                        name='memberUserId'
                        className='find-password-input'
                        placeholder='아이디'
                        value={form.memberUserId}
                        onChange={handleInput}
                    />
                </div>
                <div className='form-group'>
                    <input type='text'
                        name='memberName'
                        className='find-password-input'
                        placeholder='이름'
                        value={form.memberName}
                        onChange={handleInput}
                    />
                </div>
                <div className='form-group email-group'>
                    <input type='text'
                        name='memberEmail01'
                        className='find-password-input email-input'
                        placeholder='이메일'
                        value={form.memberEmail01}
                        onChange={handleInput}
                    />
                    <span>@</span>
                    <input type='text'
                        name='memberEmail02'
                        className='find-password-input email-input'
                        placeholder='직접입력'
                        value={form.memberEmail02}
                        onChange={handleInput}
                    />
                    <select
                        className="find-password-input email-input"
                        value={EMAIL_DOMAINS.includes(form.memberEmail02) ? form.memberEmail02 : ''}
                        onChange={selectEmailDomain}>
                        <option value="">직접입력</option>
                        {EMAIL_DOMAINS.map(domain => <option key={domain} value={domain}>{domain}</option>)}
                    </select>
                </div>
                <button type='button' className='find-password-button' onClick={submitFindPasswordHandler} disabled={status.isSubmitting}>
                    {status.isSubmitting ? '조회 중...' : '확인'}
                </button>
                <div className='login-links'>
                    <Link to={URL.MEMBER_LOGIN} className='login-link'>로그인</Link>
                    <Link to={URL.MEMBER_AGREEMENT} className='join-link'>회원가입</Link>
                </div>
            </form>
        </div>
    );
}

export default FindPasswordForm;