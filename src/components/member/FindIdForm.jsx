import FindIdInputForm from './FindIdInputForm';
import FindIdResultForm from './FindIdResultForm';
import FindTab from './FindTab';

function FindIdForm(props) {
    const { foundIds } = props;
    const isResultStep = foundIds && foundIds.length > 0;

    return (
        <div className='find-id-container'>
            <h2 className='find-id-title'>
                {isResultStep ? '아이디 찾기 결과' : '아이디 찾기'}
            </h2>
            <FindTab />

            {isResultStep ? (
                <FindIdResultForm {...props} />
            ) : (
                <FindIdInputForm {...props} />
            )}
        </div>
    );
}

export default FindIdForm;