import { useEffect, useState } from "react";
import { getMemberList } from "../../../api/member.api";
import { toast } from "react-toastify";
import { getPenaltyList } from "../../../api/penalty.api";

export function usePenaltyManage() {

    const [users, setUsers] = useState([])
    const [searchId, setSearchId] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPenalty, setSelectedPenalty] = useState(null);
    const [releaseReason, setReleaseReason] = useState("");
    const [penaltys, setPenaltys] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const fetchPenaltys = async (userId) => {
        setLoading(true);
        try {
            const res = await getPenaltyList(userId);
            console.log("패널티 목록:", res.data);
            setPenaltys(res.data || []);
        } catch (error) {
            console.log(error);
            toast.error("패널티 목록을 불러오는 과정에서 오류가 발생했습니다.")
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = () => {
        fetchUsers(searchId);
    }

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setSelectedPenalty(null);
        fetchPenaltys(user.userId);
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
        penaltys,
        loading,
        handlers: {
            handleSearch,
            handleUserClick
        }
    }
}