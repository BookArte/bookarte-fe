import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import JoinForm from '@/components/member/JoinForm';
import { useJoin } from '@/hooks/domain/member/useJoin';
import URL from '@/constants/url';

function Join() {
    const location = useLocation();
    const navigate = useNavigate();

    const agreePrivacy = location.state?.agreePrivacy;
    const agreeService = location.state?.agreeService;

    useEffect(() => {
        if (agreePrivacy !== true || agreeService !== true) {
            toast.warning('약관에 동의해야 회원가입이 가능합니다.');
            navigate(URL.MEMBER_AGREEMENT, { replace: true });
        }
    }, [agreePrivacy, agreeService, navigate]);

    const join = useJoin({ agreePrivacy, agreeService });

    return <JoinForm {...join} />;
}

export default Join;
