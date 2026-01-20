import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    accessToken: null,
    userInfo: null,

    setLogin: (accessToken, userInfo) => set({
        accessToken,
        userInfo,
    }),

    setLogout: () => set({
        accessToken: null,
        userInfo: null,
    }),
}));