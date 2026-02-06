function FindPasswordCodeForm({ codes, inputRefs, handlers, timeLeft, formatTime }) {

    const { handleCodeChange, submitCodeHandler, handlePaste } = handlers;

    return (
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
    );
}
export default FindPasswordCodeForm;