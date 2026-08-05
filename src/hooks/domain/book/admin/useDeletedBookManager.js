import { useEffect, useState } from "react";
import { getAllBookList } from "@/api/book.api";
import { toast } from "react-toastify";
import { getCategoryList } from "@/api/category.api";
import URL from '@/constants/url';
import { useNavigate } from "react-router-dom";
import { useBookList } from "@/hooks/domain/book/useBookList";
import { handleApiError } from "@/hooks/utils/errorHandler";

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
            isDeleted: true,
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
            isDeleted: true,
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
    }

    const handleSearch = () => {
        baseHandlers.fetchBooks(0, params.searchParams);
    };

    const navigate = useNavigate();

    const handleDeleteBook = async (bookId) => {
        navigate(URL.BOOK_DELETE(bookId));
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
        }
    };


}
