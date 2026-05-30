import { useEffect, useState } from "react";
import { deleteBooks, getAllBookList } from "@/api/book.api";
import { toast } from "react-toastify";
import { getCategoryList } from "@/api/category.api";
import URL from '@/constants/url';
import { useNavigate } from "react-router-dom";
import { useDataFetch } from "@/hooks/utils/useDataFetch";
import { useBookList } from "@/hooks/domain/book/useBookList";

export function useBookStatusList() {
    const TYPE = 'bookStatus';

    const {
        books,
        categories,
        params,
        status: baseStatus,
        pagination,
        handlers: baseHandlers,
        getVirtualNumber
    } = useBookList({
        type: TYPE,
        fetchFn: getAllBookList,
        idKey: 'bookId',
        initialParams: {
            sort: 'createdAt,desc',
            size: 10
        }
    });

    const [selectedIds, setSelectedIds] = useState([]);
    const { loading, totalElements } = baseStatus;

    // 초기화 함수
    const handleReset = () => {
        params.setSearchParams({
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
        baseHandlers.fetchBooks(0, params.searchParams);
    }, []);

    const handleChangeSearchParams = (target) => {
        params.setSearchParams(prev => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const handleSearch = () => {
        baseHandlers.fetchBooks(0, params.searchParams);
    };

    const navigate = useNavigate();

    const handleUpdateBook = (bookId) => {
        navigate(URL.BOOK_UPDATE(bookId));
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
                    baseHandlers.fetchBooks(0, params.searchParams);
                }
            } catch (error) {
                handleApiError(error, "도서 삭제 실패")
            }
        }
    };

    return {
        books,
        categories,
        params,
        pagination,
        getVirtualNumber,
        status: {
            ...baseStatus,
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            selectedIds,
            setSelectedIds
        },
        handlers: {
            ...baseHandlers,
            handleUpdateBook,
            handleSelectAll,
            handleSelectOne,
            handleBulkDelete,
            handleReset,
            handleChangeSearchParams,
            handleSearch
        }
    };
}
