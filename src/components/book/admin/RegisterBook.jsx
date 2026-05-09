import BookForm from "@/components/book/admin/BookForm";
import BookFormSearchBar from "@/components/book/admin/BookFormSearchBar";

function RegisterBook({ search, formData, loading, errors, handlers, refs }) {

    return (
        <div className='book-form-container'>
            <h2 className='book-work-title'>새 도서 등록</h2>
            <BookFormSearchBar
                search={search}
                errors={errors}
                handlers={handlers}
                refs={refs}
            />
            <BookForm
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