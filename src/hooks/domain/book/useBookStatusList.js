import { useEffect, useState } from "react";
import { deleteBooks, getAllBookList } from "../../../api/book.api";
import { toast } from "react-toastify";
import { getCategoryList } from "../../../api/category.api";
import URL from '@/constants/url';
import { useNavigate } from "react-router-dom";

export function useBookStatusList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useState({
        bookTitle: '',
        bookAuthor: '',
        publisherName: '',
        bookIsbn: '',
        category: '',
        publicationDateStart: '',
        publicationDateEnd: '',
        size: 10,
        sort: 'createdAt,desc'
    });

    const [selectedIds, setSelectedIds] = useState([]);

    const fetchBooks = async (page = 0) => {
        setLoading(true);
        try {
            const res = await getAllBookList({
                params: { ...searchParams, page }
            });
            if (res.success) {
                setBooks(res.data.content);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.number);
            }
        } finally {
            setLoading(false);
        }
    };

    // 카테고리 목록 조회 함수
    const fetrcCategories = async () => {
        try {
            const res = await getCategoryList();
            if (res.success) setCategories(res.data);
        } catch (error) {
            toast.error("카테고리 목록을 불러오는 중 오류가 발생했습니다.");
        }
    }

    // 초기화 함수
    const handleReset = () => {
        setSearchParams({
            bookTitle: '',
            bookAuthor: '',
            publisherName: '',
            bookIsbn: '',
            publicationDateStart: '',
            publicationDateEnd: '',
            category: '',
            size: 10,
            sort: 'createdAt,desc'
        });
    };


    useEffect(() => {
        fetchBooks();
        fetrcCategories();
    }, [searchParams]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            fetchBooks(page);
            window.scrollTo(0, 0);
        }
    };

    const navigate = useNavigate();

    // 도서 상세 페이지 이동 함수
    const handleViewBook = (bookId) => {
        navigate(URL.BOOK_VIEW(bookId));
    }

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(books.map(book => book.bookId));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;

        const confirmMessage =
            "선택한 도서를 삭제하시겠습니까?\n\n" +
            "• 대출 중인 도서는 삭제 대상에서 제외됩니다.\n" +
            "• 등록된 추천 도서 이력은 도서와 함께 삭제됩니다.\n" +
            "• 삭제된 데이터는 복구할 수 없습니다.";

        if (window.confirm(confirmMessage)) {
            try {
                const response = await deleteBooks({ bookIds: selectedIds });

                if (response.success) {

                    const { deletedCount, skippedCount, skippedTitles, totalRequestCount } = response.data;

                    if (skippedCount > 0) {
                        const titleList = skippedTitles.map(title => `• ${title}`).join("\n");

                        alert(
                            `요청하신 ${totalRequestCount}권 중 ${deletedCount}권이 삭제되었습니다.\n\n` +
                            `[삭제 제외 안내]\n` +
                            `대출 중인 아래 ${skippedCount}권은 제외되었습니다:\n${titleList}\n\n` +
                            `※ 추천 도서 이력이 있는 경우 도서와 함께 정상 삭제되었습니다.`
                        );
                    } else {

                        toast.success(`선택하신 ${deletedCount}권의 도서가 모두 삭제되었습니다.`);
                    }

                    setSelectedIds([]);
                    fetchBooks();
                }
            } catch (error) {
                console.error("삭제 작업 중 오류 발생:", error);
                toast.error("삭제 작업 중 오류가 발생했습니다. 다시 시도해 주세요.");
            }
        }
    };

    return {
        books,
        categories,
        status: {
            loading,
            totalPages,
            currentPage,
            selectedIds,
            setSelectedIds
        },
        handlers: {
            handlePageChange,
            handleReset,
            handleViewBook,
            handleSelectAll,
            handleSelectOne,
            handleBulkDelete
        }
    };

}   