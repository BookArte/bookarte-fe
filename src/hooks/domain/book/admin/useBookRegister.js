import { useBookForm } from "@/hooks/domain/book/admin/useBookForm";
import { registerBookByAdmin } from "@/api/book.api";

export function useBookRegister() {
    return useBookForm({
        isEdit: false,
        submitFn: registerBookByAdmin,
        initialData: {
            bookTitle: '',
            bookAuthor: '',
            bookTranslator: '',
            publisherName: '',
            publicationDate: '',
            bookIsbn: '',
            bookContents: '',
            bookThumbnail: '',
            bookCallNumber: '',
            bookCategory: ''
        }
    });
}