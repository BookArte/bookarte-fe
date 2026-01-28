import FindPasswordInputForm from './FindPasswordInputForm';
import FindPasswordCodeForm from './FindPasswordCodeForm';

function FindPasswordForm(props) {

    return (
        <div className='find-password-container'>
            <h2 className='find-password-title'>비밀번호 찾기</h2>
            {props.isStepCode ? (
                <FindPasswordCodeForm {...props} />
            ) : (
                <FindPasswordInputForm {...props} />
            )}
        </div>
    );
}

export default FindPasswordForm;