import FindPasswordInputForm from './FindPasswordInputForm';
import FindPasswordCodeForm from './FindPasswordCodeForm';
import FindTab from './FindTab';

function FindPasswordForm(props) {

    return (
        <div className='find-password-container'>
            <h2 className='find-password-title'>비밀번호 찾기</h2>
            <FindTab />
            {props.isStepCode ? (
                <FindPasswordCodeForm {...props} />
            ) : (
                <FindPasswordInputForm {...props} />
            )}
        </div>
    );
}

export default FindPasswordForm;