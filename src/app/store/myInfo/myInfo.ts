import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MyInfoDispatcher, MyInfoState } from "./myInfo.types";

const initialState: MyInfoState = {
  isLogin: false,
  memberId: -1,
  email: "",
  profileImageUrl: "",
  name: "",
  isAdult: false,
  isRegularPayment: false,
  point: 0,
  credit: 0,
  phoneNumber: "",
  isAddressDefault: false,
};

export const useMyInfoStore = create(
  immer<MyInfoDispatcher>((set) => ({
    ...initialState,
    dispatchIsLogin: (value: boolean) => {
      set({ isLogin: value });
    },
    dispatchMemberId: (value: number) => {
      set({ memberId: value });
    },
    dispatchEmail: (value: string) => {
      set({ email: value });
    },
    dispatchProfileImageUrl: (value: string) => {
      set({ profileImageUrl: value });
    },
    dispatchIsAdult: (value: boolean) => {
      set({ isAdult: value });
    },
    dispatchIsRegularPayment: (value: boolean) => {
      set({ isRegularPayment: value });
    },
    dispatchPoint: (value: number) => {
      set({ point: value });
    },
    clear: () => set({ ...initialState }, true),
  }))
);
