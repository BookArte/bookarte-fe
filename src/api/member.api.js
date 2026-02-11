import { apiClient, fileApiClient } from "./client";

export const joinMember = async (data) => {
    const res = await apiClient.post('/member', data);
    return res.data;
};

export const checkMemberId = async (memberUserId) => {
    const res = await apiClient.get(`/member/id_check?userId=${memberUserId}`);
    return res.data;
}

export const loginMember = async (data) => {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
}

export const refreshToken = async () => {
    const res = await apiClient.post('/auth/refresh');
    return res.data;
}

export const logoutMember = async () => {
    const res = await apiClient.post('/auth/logout');
    return res.data;
}

export const findMemberId = async (data) => {
    const res = await apiClient.post('/member/find_id', data);
    return res.data;
}

export const findMemberPassword = async (data) => {
    const res = await apiClient.post('/auth/find_password', data);
    return res.data;
};

export const verifyEmailCode = async (data) => {
    const res = await apiClient.post('/auth/verify_code', data);
    return res.data;
};

export const resetPassword = async (data) => {
    const res = await apiClient.patch('/auth/reset_password', data);
    return res.data;
};

export const getMypageData = async () => {
    const res = await apiClient.get('/member/my');
    return res.data;
}

export const modifyMember = async (data) => {
    const res = await apiClient.patch('/member/me', data);
    return res.data;
}

export const modifyPassword = async (data) => {
    const res = await apiClient.patch('/member/change_password', data);
    return res.data;
}