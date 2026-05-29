export function validateRecommendationForm(values) {
    const errors = {};

    //코멘트 검증
    if (!values.comments) {
        errors.comments = '추천 코멘트는 필수 입력 항목입니다.';
    } else if (values.comments.length > 100) {
        errors.comments = '추천 코멘트는 100자 이내로 작성해주세요.';
    }

    //추천 시작일 검증
    if (!values.startDate) errors.startDate = '추천 시작일은 필수 입력 항목입니다.';

    //추천 종료일 검증
    if (!values.endDate) errors.endDate = '추천 종료일은 필수 입력 항목입니다.';

    return errors;

}