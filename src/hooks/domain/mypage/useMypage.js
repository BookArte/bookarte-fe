import { useCallback, useEffect, useState } from 'react';
import { getMypageData } from '@/api/member.api';
import { MEMBER_GRADES, MYPAGE_STATS_CONFIG } from '@/constants/mypage';

export const useMypage = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getUserGrade = (point) => {
        if (point >= MEMBER_GRADES.VIP.MIN_POINT) return MEMBER_GRADES.VIP.NAME;
        if (point >= MEMBER_GRADES.GOLD.MIN_POINT) return MEMBER_GRADES.GOLD.NAME;
        return MEMBER_GRADES.BASIC.NAME;
    };

    const fetchMypage = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getMypageData();
            if (res.success) {
                const memberInfo = res.data;
                setData({
                    userData: {
                        userId: memberInfo.userId,
                        name: memberInfo.name,
                        email: memberInfo.email,
                        tel: memberInfo.tel,
                        point: memberInfo.point,
                        grade: getUserGrade(memberInfo.point)
                    },
                    stats: MYPAGE_STATS_CONFIG.map(config => ({
                        label: config.label,
                        icon: config.icon,
                        count: memberInfo[config.dataKey] || 0
                    }))
                });
            }
        } catch (err) {
            console.error("데이터 로드 실패:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMypage();
    }, [fetchMypage]);

    return { data, isLoading, refetch: fetchMypage };
};