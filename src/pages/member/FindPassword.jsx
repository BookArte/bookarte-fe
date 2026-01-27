import { useState } from 'react';
import FindPasswordForm from "@/components/FindPasswordForm";

function FindPassword() {

    const [isStepCode, setIsStepCode] = useState(false);

    return (
        <FindPasswordForm isStepCode={isStepCode} />
    );
}

export default FindPassword;