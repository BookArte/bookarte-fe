import BookForm from "./BookForm";

function UpdateBook({ formData, loading, errors, handlers, refs }) {
    return (
        <div className='book-form-container'>
            <h2 className='book-work-title'>도서 정보 수정</h2>
            <BookForm
                formData={formData}
                loading={loading}
                errors={errors}
                handlers={handlers}
                refs={refs}
                isEdit={true}
            />
        </div>
    );
}

export default UpdateBook;