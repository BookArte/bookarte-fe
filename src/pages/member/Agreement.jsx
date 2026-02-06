import { useAgreement } from "@/hooks/domain/useAgreement";
import AgreementForm from "@/components/member/AgreementForm";

function Agreement() {
    const agreementProps = useAgreement();

    return (
        <AgreementForm {...agreementProps} />
    );
}

export default Agreement;