import { Link, useLocation } from 'react-router-dom';
import URL from '@/constants/url';
import { EMAIL_DOMAINS } from "@/constants/email";
import FindTab from './FindTab';

function FindIdForm({ form, status, handlers }) {
    const location = useLocation();
    const isLoading = false;
    // const foundIds = ["qwer1***", "testuser****", "guest12***"];
    const foundIds = null;

    if (foundIds && foundIds.length > 0) {
        return (
            <div className='find-id-container'>
                <h2 className='find-id-title'>아이디 찾기 결과</h2>
                <FindTab />

                <div className='find-id-result-box'>
                    <div className='result-content'>
                        <p className='result-desc'>입력하신 정보와 일치하는 아이디 목록입니다.</p>
                        <div className='result-id-list-wrapper'>
                            {foundIds.map((id, index) => (
                                <div key={index} className='result-id-item'>
                                    <span className='result-id-text'>{id}</span>
                                </div>
                            ))}
                        </div>
                        <p className='result-sub-desc'>
                            개인정보 보호를 위해 아이디의 일부가 마스킹 처리되었습니다.
                        </p>
                    </div>

                    <div className='result-actions'>
                        <Link to={URL.MEMBER_LOGIN} className='find-id-btn primary'>
                            로그인하기
                        </Link>
                        <Link to={URL.MEMBER_FIND_PASSWORD} className='find-id-btn secondary'>
                            비밀번호 찾기
                        </Link>
                    </div>

                    <div className='login-links'>
                        <Link to={URL.MEMBER_AGREEMENT} className='join-link'>아직 회원이 아니신가요? 회원가입</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='find-id-container'>
            <h2 className='find-id-title'>아이디 찾기</h2>

            <FindTab />

            <form className='find-id-form'>
                <div className='form-group'>
                    <input
                        type='text'
                        name='memberName'
                        className='find-id-input'
                        placeholder='이름'
                    />
                </div>

                <div className='form-group tel-group'>
                    <select name="memberTel01" className="find-id-input">
                        <option value="010">010</option>
                    </select>
                    <span>-</span>
                    <input type='text' name='memberTel02' className='find-id-input' placeholder='1234' maxLength={4} />
                    <span>-</span>
                    <input type='text' name='memberTel03' className='find-id-input' placeholder='5678' maxLength={4} />
                </div>

                <div className='form-group email-group'>
                    <input type='text' name='memberEmail01' className='find-id-input email-input' placeholder='이메일' />
                    <span>@</span>
                    <input type='text' name='memberEmail02' className='find-id-input email-input' placeholder='직접입력' />
                    <select className="find-id-input email-input">
                        <option value="">직접입력</option>
                        {EMAIL_DOMAINS.map(domain => (
                            <option key={domain} value={domain}>{domain}</option>
                        ))}
                    </select>
                </div>

                <button type='button' className='find-id-button'>
                    아이디 찾기
                </button>

                <div className='login-links'>
                    <Link to={URL.MEMBER_LOGIN} className='login-link'>로그인</Link>
                    <Link to={URL.MEMBER_AGREEMENT} className='join-link'>회원가입</Link>
                </div>
            </form>
        </div>
    );
}

export default FindIdForm;