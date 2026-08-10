import { useEffect, useState } from "react";
import { getAllBookList } from "@/api/book.api";
import { toast } from "react-toastify";
import { getCategoryList } from "@/api/category.api";
import URL from '@/constants/url';
import { useNavigate } from "react-router-dom";
import { useBookList } from "@/hooks/domain/book/useBookList";
import { handleApiError } from "@/hooks/utils/errorHandler";
import { restoreBookByBookId } from "@/api/book.api";

export function useDeletedBookManager() {
    const TYPE = 'deletedBookManager';

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
            deleted: true,
            sort: 'createdAt,desc',
            size: 10
        }
    });

    const { loading, totalElements } = baseStatus;

    const handleReset = () => {
        params.setSearchParams({
            bookTitle: '',
            bookAuthor: '',
            publisherName: '',
            bookIsbn: '',
            publicationDateStart: '',
            publicationDateEnd: '',
            category: '',
            deleted: true,
            size: 10,
            sort: 'createdAt,desc'
        });
    };

    const handleChangeSearchParams = (target) => {
        params.setSearchParams(prev => ({
            ...prev,
            [target.name]: target.value
        }));
    }

    const handleSearch = () => {
        baseHandlers.fetchBooks(0, params.searchParams);
    };

    const navigate = useNavigate();

    const handleDeleteBook = async (bookId) => {
        navigate(URL.BOOK_DELETE(bookId));
    };

    const handleRestoreBook = async (bookId) => {
        const confirmRestore = window.confirm('정말로 도서를 복구하시겠습니까?');
        if (!confirmRestore) return;

        const response = await restoreBookByBookId(bookId);

        if (response) {
            toast.success('도서가 성공적으로 복구되었습니다.');
            baseHandlers.fetchBooks(0, params.searchParams);
        } else {
            handleApiError(error, "도서 복구 오류");
        }
    };

    return {
        books,
        categories,
        params,
        pagination,
        status: {
            ...baseStatus,
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
        },
        handlers: {
            ...baseHandlers,
            handleDeleteBook,
            handleReset,
            handleChangeSearchParams,
            handleSearch,
            handleRestoreBook
        }
    };


}
