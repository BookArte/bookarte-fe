import { EMAIL_DOMAINS } from "@/constants/email";

function JoinForm({
    form,
    handlers,
    messages,
    status
}) {
    const {
        handleInput,
        handleUserIdChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleTelChange,
        selectEmailDomain,
        idCheckHandler,
        submitFormHandler
    } = handlers;
    const {
        idMessage,
        passwordMessage,
        passwordConfirmMessage
    } = messages;
    const {
        isPasswordMatch,
        isSubmitting
    } = status;

    return (
        <div className='join-container'>
            <h2 className='join-title'>회원가입</h2>
            <form className='join-form'>
                <div className='form-group id-group'>
                    <div className='id-input-group'>
                        <input type='text'
                            name='memberUserId'
                            className='join-input id-input'
                            value={form.memberUserId}
                            onChange={handleUserIdChange}
                            placeholder='아이디'
                        />
                        <button type="button" className="id-check-btn" onClick={idCheckHandler}>중복확인</button>
                    </div>
                    {idMessage && (
                        <span className='id-message-error'>
                            {idMessage}
                        </span>
                    )}
                </div>
                <div className='form-group password-group'>
                    <input
                        type='password'
                        name='memberPassword'
                        className='join-input'
                        value={form.memberPassword}
                        onChange={handlePasswordChange}
                        placeholder='비밀번호'
                    />
                    {passwordMessage && (
                        <span className='password-message-error'>
                            {passwordMessage}
                        </span>
                    )}
                </div>
                <div className='form-group password-group'>
                    <input
                        type='password'
                        name='memberConfirmPassword'
                        className='join-input'
                        placeholder='비밀번호 확인'
                        value={form.memberConfirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {isPasswordMatch !== null && (
                        <span className={isPasswordMatch ? 'password-match' : 'password-mismatch'}>
                            {passwordConfirmMessage}
                        </span>
                    )}
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        name='memberName'
                        className='join-input'
                        placeholder='이름'
                        value={form.memberName}
                        onChange={handleInput}
                    />
                </div>
                <div className='form-group tel-group'>
                    <select name="memberTel01" className="join-input" value={form.memberTel01} onChange={handleInput}>
                        <option value="010">010</option>
                    </select>
                    <span>-</span>
                    <input
                        type='text'
                        name='memberTel02'
                        className='join-input'
                        placeholder='1234'
                        maxLength={4}
                        value={form.memberTel02}
                        onChange={handleTelChange('memberTel02')}
                    />
                    <span>-</span>
                    <input
                        type='text'
                        name='memberTel03'
                        className='join-input'
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
                        className='join-input email-input'
                        placeholder='이메일'
                        value={form.memberEmail01}
                        onChange={handleInput}
                    />
                    <span>@</span>
                    <input
                        type='text'
                        name='memberEmail02'
                        className='join-input email-input'
                        placeholder='직접입력'
                        value={form.memberEmail02}
                        onChange={handleInput}
                    />
                    <select
                        className="join-input email-input"
                        value={EMAIL_DOMAINS.includes(form.memberEmail02)
                            ? form.memberEmail02
                            : ''
                        }
                        onChange={selectEmailDomain}
                    >
                        <option value="">직접입력</option>
                        {EMAIL_DOMAINS.map(domain => (
                            <option key={domain} value={domain}>{domain}</option>
                        ))}
                    </select>
                </div>
                <button
                    type='button'
                    className='join-button'
                    onClick={submitFormHandler}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '회원가입 중...' : '회원가입'}
                </button>
            </form>
        </div>
    );
}

export default JoinForm;
