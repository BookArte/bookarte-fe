import BookForm from "./BookForm";

function DeleteBook({ formData, loading, errors, handlers, refs }) {
    return (
        <div className='book-form-container'>
            <h2 className='book-work-title'>도서 삭제</h2>
            <BookForm
                formData={formData}
                loading={loading}
                errors={errors}
                handlers={handlers}
                refs={refs}
                isDelete={true}
            />
        </div>
    );
}

export default DeleteBook;