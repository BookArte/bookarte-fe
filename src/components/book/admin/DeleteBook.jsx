import BookForm from "./BookForm";

function DeleteBook({ formData, loading, errors, handlers, refs, isAlreadyDeleted }) {
    return (
        <div className='book-form-container'>
            <h2 className='book-work-title'>{isAlreadyDeleted ? "도서 삭제 사유 수정" : "도서 삭제"}</h2>
            <BookForm
                formData={formData}
                loading={loading}
                errors={errors}
                handlers={handlers}
                refs={refs}
                isDelete={true}
                isAlreadyDeleted={isAlreadyDeleted}
            />
        </div>
    );
}

export default DeleteBook;