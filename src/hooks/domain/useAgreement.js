import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from '@/constants/url';

export function useAgreement() {
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

    return {
        agreeAll,
        agreePrivacy,
        agreeService,
        handlers: {
            agreeAllCheck,
            agreePrivacyCheck,
            agreeServiceCheck,
            nextButtonClick
        }
    };
}