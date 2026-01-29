function ResetPasswordForm({ form, handlers, status }) {
    const { handleChange, submitResetHandler } = handlers;

    return (
        <div className='reset-password-container'>
            <h2 className='reset-password-title'>비밀번호 재설정</h2>

            <form className='reset-password-form' onSubmit={(e) => e.preventDefault()}>
                <p className='reset-guide-text'>
                    새로운 비밀번호를 입력해주세요.<br />
                    보안을 위해 영문자와 숫자를 포함한 8~16자를 입력해주세요.
                </p>

                <div className='reset-form-group'>
                    <input
                        type='password'
                        name='newPassword'
                        className='reset-password-input'
                        placeholder='새 비밀번호'
                        value={form.newPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className='reset-form-group'>
                    <input
                        type='password'
                        name='confirmPassword'
                        className='reset-password-input'
                        placeholder='새 비밀번호 확인'
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type='button'
                    className='reset-password-button'
                    onClick={submitResetHandler}
                    disabled={status.isSubmitting}
                >
                    {status.isSubmitting ? '변경 중...' : '비밀번호 변경 완료'}
                </button>
            </form>
        </div>
    );
}

export default ResetPasswordForm;