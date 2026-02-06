import FindIdForm from "@/components/member/FindIdForm";
import { useFindId } from '@/hooks/domain/useFindId';

function FindId() {

    const findIdProps = useFindId();

    return (
        <FindIdForm {...findIdProps} />
    )
}

export default FindId;