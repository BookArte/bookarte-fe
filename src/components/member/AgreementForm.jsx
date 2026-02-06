import AgreementTerm from "./AgreementTerm";

function AgreementForm(props) {
    const {
        agreeAll,
        agreePrivacy,
        agreeService,
        handlers
    } = props;
    const {
        agreeAllCheck,
        agreePrivacyCheck,
        agreeServiceCheck,
        nextButtonClick
    } = handlers;

    return (
        <div className='agreement-container'>
            <h2 className='agreement-title'>이용약관 및 개인정보 처리방침</h2>
            <label htmlFor="agree-all" className="agree-all-label">
                <input type="checkbox" id="agree-all" checked={agreeAll} onChange={agreeAllCheck} />
                <p>전체 동의</p>
            </label>
            <AgreementTerm
                id="agree-privacy"
                title="개인정보 처리방침 동의 (필수)"
                checked={agreePrivacy}
                onChange={agreePrivacyCheck}
                contents="여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다."
            />
            <AgreementTerm
                id="agree-service"
                title="서비스 이용약관 동의 (필수)"
                checked={agreeService}
                onChange={agreeServiceCheck}
                contents="여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다."
            />
            <button className={agreeAll ? "next-button" : "next-button next-button-disabled"} onClick={nextButtonClick}>다음단계</button>
        </div>
    )
}

export default AgreementForm;