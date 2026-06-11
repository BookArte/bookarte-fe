import { useCallback, useEffect, useRef, useState } from "react";
import { getMemberList, expelMember } from "@/api/member.api";
import { toast } from "react-toastify";
import { getMemberBorrowList } from "@/api/borrow.api";
import { handleApiError } from "../../utils/errorHandler";

export function useMemberList() {
    const [users, setUsers] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [borrows, setBorrows] = useState([]);
    const [selectedBorrow, setSelectedBorrow] = useState(null);

    const [hasNext, setHasNext] = useState(false);
    const [loading, setLoading] = useState(true);

    const observer = useRef();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (userId, isMore = false) => {
        setLoading(true);

        try {
            const lastId = isMore && users.length > 0 ? users[users.length - 1].id : null;
            const res = await getMemberList(lastId, userId || "");

            const newUsers = res.data.content || [];
            const hasNext = res.data.hasNext;

            setHasNext(hasNext);

            if (isMore) {
                setUsers(prev => [...prev, ...newUsers]);
            } else {
                setUsers(newUsers);
            }

        } catch (error) {
            console.error("프론트엔드 로직 에러 확인:", error);
            handleApiError(error, "유저 목록 로드 실패");
        } finally {
            setLoading(false);
        }
    };

    const fetchBorrows = async (memberId, targetBorrowId) => {
        setLoading(true);
        try {
            const res = await getMemberBorrowList(memberId);
            const newBorrows = res.data || [];
            setBorrows(newBorrows);

            if (targetBorrowId) {
                const updatedBorrow = newBorrows.find(b => b.borrowId === targetBorrowId);
                if (updatedBorrow) {
                    setSelectedBorrow(updatedBorrow);
                }
            }

        } catch (error) {
            console.error("요청 중 에러 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchUsers(searchId);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setSelectedBorrow(null);
        fetchBorrows(user.id);
    };

    const handleExpelMember = async (memberId) => {
        if (!window.confirm('정말로 추방하시겠습니까? 추방된 회원은 복구할 수 없습니다.')) {
            return;
        }

        try {
            const res = await expelMember({ id: memberId });
            if (res.success) {
                toast.success("회원이 성공적으로 추방되었습니다.");

                if (selectedUser) {
                    selectedUser.withdrawal = "Y";
                    handleUserClick(selectedUser);
                }
            }
        } catch (error) {
            handleApiError(error, "회원 추방 실패");
        }
    };

    const lastUserElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNext) {
                fetchUsers(searchId, true);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasNext, searchId]);

    return {
        state: {
            selectedUser,
            selectedBorrow,
            setSelectedBorrow,
            lastUserElementRef
        },
        searchId,
        setSearchId,
        fetchUsers,
        users,
        borrows,
        loading,
        handlers: {
            handleSearch,
            handleUserClick,
            handleExpelMember
        }
    };
}