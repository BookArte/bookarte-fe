import { useEffect, useState } from "react";
import { getMemberList } from "../../../api/member.api";
import { toast } from "react-toastify";

export function usePenaltyManage() {

    const [users, setUsers] = useState([])
    const [searchId, setSearchId] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPenalty, setSelectedPenalty] = useState(null);
    const [releaseReason, setReleaseReason] = useState("");
    const [loading, setLoading] = useState(true);


    // 샘플 데이터
    const penaltyData = {
        'test12': [
            { id: 1, date: '2026-02-12', content: '도서 [이방인] 2일 연체', status: 'ACTIVE', overdueDays: 2, period: '2026.01.16~2026.01.17', penaltyPeriod: '2026.01.17~2026.01.18', isbn: '9788937460012' },
            { id: 2, date: '2026-02-12', content: '도서 [날개] 2일 연체', status: 'RELEASED', overdueDays: 2, reason: '도서관 시스템 오류로 인한 해제' }
        ]
    };

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async (userId) => {
        setLoading(true);

        try {
            const res = await getMemberList(userId || "");
            setUsers(res.data || []);

        } catch (error) {
            console.log(error);
            toast.error("사용자 목록을 불러오는 과정에서 오류가 발생했습니다.")
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchUsers(searchId);
    }


    const handleUserClick = (user) => {
        setSelectedUser(user);
        setSelectedPenalty(null);
        setReleaseReason("");
    }

    return {
        state: {
            selectedUser,
            selectedPenalty,
            setSelectedPenalty,
            releaseReason,
            setReleaseReason
        },
        searchId,
        setSearchId,
        users,
        penaltyData,
        handlers: {
            handleSearch,
            handleUserClick
        }
    }
}