import FindIdForm from "@/components/member/FindIdForm";
import { useFindId } from '@/hooks/domain/member/useFindId';

function FindId() {

    const findIdProps = useFindId();

    return (
        <FindIdForm {...findIdProps} />
    )
}

export default FindId;