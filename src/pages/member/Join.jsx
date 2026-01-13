import { useState } from 'react';

function Join() {
    const [tel02, setTel02] = useState('');
    const [tel03, setTel03] = useState('');
    const [email01, setEmail01] = useState('');
    const [email02, setEmail02] = useState('');
    const [email02Placeholder, setEmail02Placeholder] = useState('직접입력');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(null);

    const handleTel02Change = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setTel02(value);
    };

    const handleTel03Change = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setTel03(value);
    }

    const handleEmail01Change = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9._%+-]/g, '');
        setEmail01(value);
    };

    const handleEmail02Change = (e) => {
        const value = e.target.value.replace(/[^a-z]/g, '');
        setEmail02(value);
    };

    const selectEmailDomain = (e) => {
        const selectedDomain = e.target.value;
        if (selectedDomain === '') {
            setEmail02('');
            setEmail02Placeholder('직접입력');
        } else {
            setEmail02(selectedDomain);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (confirmPassword) {
            checkPasswordMatch(value, confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        checkPasswordMatch(password, value);
    };

    const checkPasswordMatch = (pw, confirmPw) => {
        if (!confirmPw) {
            setIsPasswordMatch(null);
            setPasswordConfirmMessage('');
            return;
        }

        if (pw === confirmPw) {
            setIsPasswordMatch(true);
            setPasswordConfirmMessage('비밀번호가 일치합니다.');
        } else {
            setIsPasswordMatch(false);
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
        }
    };


    return (
        <div className='join-container'>
            <h2 className='join-title'>회원가입</h2>
            <form className='join-form'>
                <div className='form-group'>
                    <input type='text' id='member_id' name='member_id' className='join-input id-input' placeholder='아이디' required />
                    <button type="button" className="id-check-btn">중복확인</button>
                </div>
                <div className='form-group'>
                    <input type='password' id='member_password' name='member_password' className='join-input' placeholder='비밀번호' onChange={handlePasswordChange} required />
                </div>
                <div className='form-group password-confirm-group'>
                    <input type='password' id='member_confirm_password' name='member_confirm_password' className='join-input' placeholder='비밀번호 확인' onChange={handleConfirmPasswordChange} required />
                    {isPasswordMatch !== null && (
                        <span className={isPasswordMatch ? 'password-match' : 'password-mismatch'}>
                            {passwordConfirmMessage}
                        </span>
                    )}
                </div>
                <div className='form-group'>
                    <input type='text' id='member_name' name='member_name' className='join-input' placeholder='이름' required />
                </div>
                <div className='form-group tel-group'>
                    <select name="member_tel01" id="member_tel01" className="join-input">
                        <option value="010">010</option>
                    </select>
                    <span>-</span>
                    <input type='text' id='member_tel02' name='member_tel02' className='join-input' placeholder='1234' maxLength={4} value={tel02} onChange={handleTel02Change} required />
                    <span>-</span>
                    <input type='text' id='member_tel03' name='member_tel03' className='join-input' placeholder='5678' maxLength={4} value={tel03} onChange={handleTel03Change} required />
                </div>
                <div className='form-group email-group'>
                    <input type='text' id='member_email01' name='member_email01' className='join-input email-input' placeholder='이메일' value={email01} onChange={handleEmail01Change} required />
                    <span>@</span>
                    <input type='text' id='member_email02' name='member_email02' className='join-input email-input' placeholder={email02Placeholder} value={email02} onChange={handleEmail02Change} required />
                    <select name="member_email03" id="member_email03" className="join-input email-input" onChange={selectEmailDomain}>
                        <option value="">직접입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="daum.net">daum.net</option>
                    </select>
                </div>
                <button type='submit' className='join-button'>회원가입</button>
            </form>
        </div>
    )
}
export default Join;