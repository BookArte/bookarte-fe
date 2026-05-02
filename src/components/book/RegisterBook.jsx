import BookForm from "./BookForm";

function RegisterBook({ search, formData, loading, errors, handlers, refs }) {

    return (
        <div className='book-form-container'>
            <h2 className='book-work-title'>새 도서 등록</h2>
            <BookForm
                search={search}
                formData={formData}
                loading={loading}
                errors={errors}
                handlers={handlers}
                refs={refs}
            />
        </div>
    );
}

export default RegisterBook;