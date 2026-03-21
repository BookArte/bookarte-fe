import { useEffect } from "react";
import { getMyPenalties } from "../../../api/penalty.api";
import { useDataFetch } from "../../utils/useDataFetch";

export function useMyPenalties() {
    const {
        data: penalties,
        status,
        fetchData: fetchMyPenalties
    } = useDataFetch(getMyPenalties);

    const { loading: isPenaltyLoading } = status;

    useEffect(() => {
        fetchMyPenalties();
    }, [])


    return {
        penalties,
        isPenaltyLoading
    }
}