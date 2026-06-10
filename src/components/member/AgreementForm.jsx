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
                contents={`[개인정보 처리방침]
                    1. 개인정보의 수집 및 이용 목적
                    본 도서관 서비스는 다음의 목적을 위해 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    - 회원 가입 및 관리: 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리
                    - 도서관 서비스 제공: 도서 대출·반납, 예약, 연체 관리, 이용자 맞춤형 도서 추천, 정기 통계 분석

                    2. 수집하는 개인정보 항목
                    - 필수항목: 아이디, 비밀번호, 성명, 이메일, 휴대전화번호
                    - 서비스 이용 과정에서 생성되는 항목: 도서 대출/반납/예약 이력, 연체 및 이용 제한 기록

                    3. 개인정보의 보유 및 이용기간
                    - 이용자의 개인정보는 원칙적으로 회원 탈퇴 시 즉시 파기하는 것을 원칙으로 합니다.
                    - 단, 미반납 도서가 있거나 연체료 납부 및 페널티 기간이 남아있는 회원의 경우, 도서관 자산 보호 및 이용 규칙 준수를 위해 해당 의무가 완전히 해소될 때까지 탈퇴가 제한되며 개인정보는 파기되지 않고 보존됩니다.

                    4. 동의를 거부할 권리
                    귀하는 본 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 필수항목에 대한 동의를 거부하는 경우 회원가입 및 도서 대출 등의 서비스 이용이 불가능합니다.`}
            />
            <AgreementTerm
                id="agree-service"
                title="서비스 이용약관 동의 (필수)"
                checked={agreeService}
                onChange={agreeServiceCheck}
                contents={`[서비스 이용약관]
                    제 1 조 (목적)
                    본 약관은 본 도서관 서비스(이하 "도서관")가 제공하는 웹 기반 회원 서비스의 이용조건 및 절차, 이용자와 도서관 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

                    제 2 조 (이용계약의 성립 및 회원 가입)
                    1. 이용계약은 이용자가 본 약관 및 개인정보 처리방침에 동의하고, 도서관이 정한 가입 양식에 따라 필수 정보를 입력하여 가입을 신청하면, 별도의 거부 사유가 없는 한 도서관이 이를 승인함으로써 성립됩니다.
                    2. 도서관은 타인의 명의를 도용하거나 허위 정보를 입력한 신청에 대해 승인을 거절하거나 사후에 계약을 해지할 수 있습니다.


                    제 3 조 (도서 대출 및 서비스 이용 제재)
                    1. 회원은 도서관이 정한 규정(예: 인당 최대 대출 권수, 대출 기간)에 따라 도서를 대출할 수 있습니다.
                    2. 회원이 대출한 도서를 기한 내에 반납하지 않을 경우(연체), 도서관은 규정에 따라 일정 기간 대출 정지, 예약 제한 등의 페널티를 부과할 수 있습니다.
                    3. 도서관 물품(도서, 기자재 등)을 분실하거나 훼손했을 경우, 회원은 동일 도서로 변상하거나 이에 상응하는 금액으로 배상해야 합니다.


                    제 4 조 (회원 탈퇴 및 이용 제한)
                    1. 회원은 언제든지 서비스 내 마이페이지를 통해 탈퇴를 신청할 수 있습니다.
                    2. 대출 중인 도서가 있거나 연체 페널티가 진행 중인 경우, 도서 및 페널티 상태가 완전히 정상화될 때까지 회원 탈퇴가 제한될 수 있습니다.
                    3. 탈퇴가 완료된 회원의 계정 정보 및 이용 이력은 즉시 비활성화되며, 도서관 규정에 따라 처리됩니다.

                    제 5 조 (책임 제한)
                    1. 도서관은 천재지변, 디도스(DDoS) 공격, 기간통신사업자의 서비스 중단 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
                    2. 이용자가 자신의 아이디 및 비밀번호를 소홀히 관리하여 발생한 모든 손해의 책임은 회원 본인에게 있습니다.`}
            />
            <button className={agreeAll ? "next-button" : "next-button next-button-disabled"} onClick={nextButtonClick}>다음단계</button>
        </div>
    )
}

export default AgreementForm;