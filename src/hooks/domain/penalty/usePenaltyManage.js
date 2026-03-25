import { useEffect, useState } from "react";
import { getMemberList } from "../../../api/member.api";
import { toast } from "react-toastify";
import { getPenaltyList, releasePenalty, revokePenalty } from "../../../api/penalty.api";

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
            handleApiError(error, "유저 목록 로드 실패")
        } finally {
            setLoading(false);
        }
    };

    const fetchPenaltys = async (userId, targetPenaltyId = null) => {
        setLoading(true);
        try {
            const res = await getPenaltyList(userId);
            const newPenaltys = res.data || [];
            setPenaltys(newPenaltys);
            if (targetPenaltyId) {
                const updatedPenalty = newPenaltys.find(p => p.penaltyId === targetPenaltyId);
                if (updatedPenalty) {
                    setSelectedPenalty(updatedPenalty);
                }
            }
        } catch (error) {
            handleApiError(error, "특정 사용자 패널티 목록 로드 실패")

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

    const hanadleRevokePenalty = async (penaltyId) => {
        try {
            const res = await revokePenalty(penaltyId);
            if (res.data) {
                toast.success("패널티가 성공적으로 복구되었습니다.");

                if (selectedUser) fetchPenaltys(selectedUser.userId, penaltyId);
            }
        }
        catch (error) {
            handleApiError(error, "패널티 복구 실패")
        }
    }

    const handleReleasePenalty = async (penaltyId) => {
        if (!releaseReason.trim()) {
            toast.warn("해제 사유를 입력해주세요.");
            return;
        }
        try {
            const res = await releasePenalty(penaltyId, releaseReason);
            if (res.data) {
                toast.success("패널티가 성공적으로 해제되었습니다.");
                if (selectedUser) fetchPenaltys(selectedUser.userId, penaltyId);
            }
        }
        catch (error) {
            handleApiError(error, "패널티 해제 실패")
        }
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
            handleUserClick,
            hanadleRevokePenalty,
            handleReleasePenalty
        }
    }
}