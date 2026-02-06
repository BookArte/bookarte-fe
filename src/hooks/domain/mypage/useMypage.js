import { useEffect, useState } from 'react';
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

    useEffect(() => {
        const fetchMypage = async () => {
            try {
                const res = await getMypageData();
                if (res.success) {
                    const memberInfo = res.data;

                    setData({
                        userData: {
                            name: memberInfo.name,
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
                // console.error("마이페이지 정보 조회 실패:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMypage();
    }, []);

    return { data, isLoading };
};