import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';

function Agreement() {
    const navigate = useNavigate();

    const [agreeAll, setAgreeAll] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeService, setAgreeService] = useState(false);

    const agreeAllCheck = (e) => {
        const isChecked = e.target.checked;
        setAgreeAll(isChecked);
        setAgreePrivacy(isChecked);
        setAgreeService(isChecked);
    }

    const agreePrivacyCheck = (e) => {
        const isChecked = e.target.checked;
        setAgreePrivacy(isChecked);
        setAgreeAll(isChecked && agreeService);
    }

    const agreeServiceCheck = (e) => {
        const isChecked = e.target.checked;
        setAgreeService(isChecked);
        setAgreeAll(isChecked && agreePrivacy);
    }

    const nextButtonClick = () => {
        if (agreePrivacy && agreeService) {
            navigate(URL.MEMBER_JOIN, {
                state: {
                    agreePrivacy,
                    agreeService
                }
            });
        }
    }

    return (
        <div className='agreement-container'>
            <h2 className='agreement-title'>이용약관 및 개인정보 처리방침</h2>
            <label htmlFor="agree-all" className="agree-all-label">
                <input type="checkbox" id="agree-all" checked={agreeAll} onChange={agreeAllCheck} />
                <p>전체 동의</p>
            </label>
            <div className="agreement-group">
                <label htmlFor="agree-privacy" className="agree-label">
                    <input type="checkbox" id="agree-privacy" checked={agreePrivacy} onChange={agreePrivacyCheck} />
                    <p>개인정보 처리방침 동의 (필수)</p>
                </label>
                <p className="agree-terms">
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                    여기에 개인정보 처리방침 내용이 들어갑니다. 사용자는 이 방침에 동의해야만 회원가입을 진행할 수 있습니다.
                </p>
            </div>
            <div className="agreement-group">
                <label htmlFor="agree-service" className="agree-label">
                    <input type="checkbox" id="agree-service" checked={agreeService} onChange={agreeServiceCheck} />
                    <p>서비스 이용약관 동의 (필수)</p>
                </label>
                <p className="agree-terms">
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                    여기에 서비스 이용약관 내용이 들어갑니다. 사용자는 이 약관에 동의해야만 서비스를 이용할 수 있습니다.
                </p>
            </div>
            <button className={agreeAll ? "next-button" : "next-button next-button-disabled"} onClick={nextButtonClick}>다음단계</button>
        </div>
    );
}

export default Agreement;