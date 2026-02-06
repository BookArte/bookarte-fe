import { Link } from 'react-router-dom';
import URL from '@/constants/url';

function FindIdResultForm({ foundIds }) {
    return (
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
    )
}
export default FindIdResultForm;