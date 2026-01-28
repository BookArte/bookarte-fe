import { Link } from 'react-router-dom';
import URL from '@/constants/url';
import { EMAIL_DOMAINS } from "@/constants/email";

function FindIdInputForm({ form, handlers, status }) {
    
    const { handleInput, handleTelChange, selectEmailDomain, submitFindIdHandler } = handlers;

    return (
        <form className='find-id-form'>
            <div className='form-group'>
                <input
                    type='text'
                    name='memberName'
                    className='find-id-input'
                    placeholder='이름'
                    value={form.memberName}
                    onChange={handleInput}
                />
            </div>

            <div className='form-group tel-group'>
                <select
                    name="memberTel01"
                    className="find-id-input"
                    value={form.memberTel01}
                    onChange={handleInput}
                >
                    <option value="010">010</option>
                </select>
                <span>-</span>
                <input
                    type='text'
                    name='memberTel02'
                    className='find-id-input'
                    placeholder='1234'
                    maxLength={4}
                    value={form.memberTel02}
                    onChange={handleTelChange('memberTel02')}
                />
                <span>-</span>
                <input
                    type='text'
                    name='memberTel03'
                    className='find-id-input'
                    placeholder='5678'
                    maxLength={4}
                    value={form.memberTel03}
                    onChange={handleTelChange('memberTel03')}
                />
            </div>

            <div className='form-group email-group'>
                <input
                    type='text'
                    name='memberEmail01'
                    className='find-id-input email-input'
                    placeholder='이메일'
                    value={form.memberEmail01}
                    onChange={handleInput}
                />
                <span>@</span>
                <input
                    type='text'
                    name='memberEmail02'
                    className='find-id-input email-input'
                    placeholder='직접입력'
                    value={form.memberEmail02}
                    onChange={handleInput}
                />
                <select
                    className="find-id-input email-input"
                    value={EMAIL_DOMAINS.includes(form.memberEmail02) ? form.memberEmail02 : ''}
                    onChange={selectEmailDomain}>
                    <option value="">직접입력</option>
                    {EMAIL_DOMAINS.map(domain => <option key={domain} value={domain}>{domain}</option>)}
                </select>
            </div>

            <button type='button' className='find-id-button' onClick={submitFindIdHandler} disabled={status.isSubmitting}>
                {status.isSubmitting ? '조회 중...' : '아이디 찾기'}
            </button>

            <div className='login-links'>
                <Link to={URL.MEMBER_LOGIN} className='login-link'>로그인</Link>
                <Link to={URL.MEMBER_AGREEMENT} className='join-link'>회원가입</Link>
            </div>
        </form>
    );
}

export default FindIdInputForm;